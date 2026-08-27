import { sanitizeBackendError, statusText } from "../../utils/sanitizeBackendError";

/** Laravel does the slow work (external car lookups, PDF generation), so this is
 *  generous. Both sides use `retry: 0` - one click must not multiply backend load. */
const UPSTREAM_TIMEOUT_MS = 120_000;

/** Copied from the browser request. Cookies and every other header are dropped. */
const FORWARDED_REQUEST_HEADERS = [
  "authorization",
  "accept",
  "accept-language",
  "x-guest-token",
  "x-request-id",
  "if-none-match",
  "if-modified-since",
] as const;

/** Copied back from Laravel. Compression and length headers are deliberately absent:
 *  $fetch may already have decoded the body, so they would describe the wrong bytes. */
const FORWARDED_RESPONSE_HEADERS = [
  "content-disposition",
  "retry-after",
  "cache-control",
  "etag",
  "last-modified",
  "x-content-type-options",
  "x-ratelimit-limit",
  "x-ratelimit-remaining",
  "x-ratelimit-reset",
] as const;

const isJson = (contentType: string | null | undefined): boolean =>
  Boolean(contentType && contentType.includes("json"));

const decodeJson = (body: ArrayBuffer | null): unknown => {
  if (!body || body.byteLength === 0) return null;
  try {
    return JSON.parse(new TextDecoder().decode(body));
  } catch {
    return null;
  }
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const path = (getRouterParam(event, "_") || "").replace(/^\/+/, "");
  const method = event.method.toUpperCase();
  const url = `${config.backendBase.replace(/\/+$/, "")}/${path}`;

  const incoming = getRequestHeaders(event);
  const headers: Record<string, string> = { Accept: "application/json" };

  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = incoming[name];
    if (value) headers[name] = value;
  }

  // Only a proxy we control may name the client; a browser-supplied X-Forwarded-For
  // would let anyone wear someone else's rate-limit identity.
  const clientIp = getRequestIP(event, { xForwardedFor: config.trustProxyHeaders });
  if (clientIp) {
    headers["x-forwarded-for"] = clientIp;
    headers["x-real-ip"] = clientIp;
  }

  let body: Buffer | undefined;
  if (method !== "GET" && method !== "HEAD") {
    // Raw bytes, not a parsed body: re-encoding would corrupt anything non-JSON.
    body = (await readRawBody(event, false)) || undefined;
    if (body && incoming["content-type"]) headers["content-type"] = incoming["content-type"];
  }

  let response: Awaited<ReturnType<typeof $fetch.raw<ArrayBuffer>>>;
  try {
    response = await $fetch.raw<ArrayBuffer>(url, {
      method: method as "GET",
      query: getQuery(event),
      headers,
      body,
      responseType: "arrayBuffer",
      retry: 0,
      timeout: UPSTREAM_TIMEOUT_MS,
      ignoreResponseError: true,
    });
  } catch (error) {
    // Refused connection, DNS failure, timeout. The destination and cause stay in the
    // server log; the browser is told only that the backend is unreachable.
    const timedOut = (error as Error)?.name === "TimeoutError";
    const status = timedOut ? 504 : 502;

    console.error(`[api-proxy] ${method} ${url} failed:`, error);
    setResponseStatus(event, status);
    return { success: false, status, message: statusText(status) };
  }

  const upstreamType = response.headers.get("content-type");

  if (response.status >= 400) {
    console.warn(`[api-proxy] ${method} ${url} -> ${response.status}`);
    setResponseStatus(event, response.status);
    setResponseHeader(event, "content-type", "application/json");

    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) setResponseHeader(event, "retry-after", retryAfter);

    return sanitizeBackendError(
      isJson(upstreamType) ? decodeJson(response._data ?? null) : null,
      response.status,
      retryAfter,
    );
  }

  setResponseStatus(event, response.status);
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = response.headers.get(name);
    if (value) setResponseHeader(event, name, value);
  }

  // 204/205 must not carry a body, and neither must an empty 200.
  const data = response._data;
  if (response.status === 204 || response.status === 205 || !data || data.byteLength === 0) {
    return null;
  }

  if (upstreamType) setResponseHeader(event, "content-type", upstreamType);

  return Buffer.from(data);
});
