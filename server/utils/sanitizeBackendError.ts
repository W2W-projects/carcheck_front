/**
 * Laravel error bodies are not safe to hand to a browser as-is: with APP_DEBUG on they
 * carry `exception`, `file`, `line` and a full `trace`, and an exception `message` is
 * often a raw SQL string. Only the fields below survive, and 5xx messages are replaced
 * outright rather than trimmed.
 */

const ALLOWED_FIELDS = [
  "success",
  "status",
  "message",
  "error",
  "errors",
  "code",
  "retry_after",
] as const;

const MAX_MESSAGE_LENGTH = 300;

const STATUS_TEXT: Record<number, string> = {
  400: "The request could not be processed.",
  401: "Authentication is required.",
  403: "You do not have access to this resource.",
  404: "The requested resource was not found.",
  405: "That action is not allowed here.",
  409: "The request conflicts with the current state.",
  413: "The request payload is too large.",
  422: "The submitted data is invalid.",
  429: "Too many requests. Please wait and try again.",
  500: "The server could not complete the request.",
  502: "The service is unavailable right now.",
  503: "The service is temporarily unavailable.",
  504: "The service took too long to respond.",
};

export const statusText = (status: number): string =>
  STATUS_TEXT[status] || (status >= 500 ? STATUS_TEXT[500]! : STATUS_TEXT[400]!);

/** First line only, length-capped: multi-line exception text is where traces hide. */
const safeText = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.split("\n", 1)[0]!.trim();
  return trimmed ? trimmed.slice(0, MAX_MESSAGE_LENGTH) : undefined;
};

/** Laravel validation output is `{ field: [message, ...] }`. Anything else is dropped. */
const safeValidationErrors = (value: unknown): Record<string, string[]> | undefined => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const result: Record<string, string[]> = {};
  for (const [field, messages] of Object.entries(value as Record<string, unknown>)) {
    const list = (Array.isArray(messages) ? messages : [messages])
      .map(safeText)
      .filter((message): message is string => Boolean(message));

    if (list.length) result[field.slice(0, 100)] = list;
  }

  return Object.keys(result).length ? result : undefined;
};

export function sanitizeBackendError(
  body: unknown,
  status: number,
  retryAfterHeader?: string | null,
): Record<string, unknown> {
  const source: Record<string, unknown> =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};

  const safe: Record<string, unknown> = { success: false, status };

  for (const field of ALLOWED_FIELDS) {
    if (!(field in source)) continue;

    switch (field) {
      case "message":
      case "error":
      case "code": {
        const text = safeText(source[field]);
        if (text) safe[field] = text;
        break;
      }
      case "errors": {
        const errors = safeValidationErrors(source[field]);
        if (errors) safe.errors = errors;
        break;
      }
      case "retry_after": {
        const seconds = Number(source[field]);
        if (Number.isFinite(seconds)) safe.retry_after = seconds;
        break;
      }
      // `success`/`status` are re-derived from the real response status above.
    }
  }

  // A 5xx message is an uncaught exception's text. Never pass it through.
  if (status >= 500) safe.message = statusText(status);

  if (status === 429) {
    safe.retry_after = Number(retryAfterHeader) || Number(safe.retry_after) || 60;
  }

  if (!safe.message) safe.message = statusText(status);

  return safe;
}
