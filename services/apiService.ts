import { useTokenStore } from "@/stores/token";
import type { ApiErrorBody, ApiRequestError } from "~/types/models";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Every Laravel call goes through Nuxt's own server at /api/service/*, which forwards it
 * to the backend (see server/api/service/[...].ts). Same origin, so no CORS and no
 * backend URL in the bundle; the browser only ever supplies who it is.
 */
const PROXY_PREFIX = "/api/service";

const guestToken = (): string | null => {
  if (typeof localStorage === "undefined") return null;

  let existing = localStorage.getItem("guest_token");
  if (!existing) {
    existing =
      crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("guest_token", existing);
  }

  return existing;
};

const ApiService = {
  async request<T>(
    endpoint: string,
    method: HttpMethod,
    data: unknown = null,
    token: string | null = null,
  ): Promise<T> {
    const tokenToUse = token || useTokenStore().getToken;
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const guest = guestToken();
    if (guest) headers["X-Guest-Token"] = guest;
    if (tokenToUse) headers.Authorization = `Bearer ${tokenToUse}`;

    try {
      // $fetch, not fetch: it resolves the relative URL during SSR too, and it leaves an
      // empty 204 body as null instead of throwing on JSON.parse.
      return await $fetch<T>(`${PROXY_PREFIX}/${endpoint.replace(/^\/+/, "")}`, {
        method,
        headers,
        body: data === null ? undefined : data,
        retry: 0,
      });
    } catch (error) {
      const failure = error as { status?: number; statusCode?: number; data?: ApiErrorBody };

      console.error(`${method} ${endpoint} error:`, failure.status, failure.data?.message);

      // Same shape the callers already read: error.data.message, error.data.errors.
      throw {
        status: failure.status ?? failure.statusCode ?? 0,
        data: failure.data ?? { message: "The request could not be completed." },
      } satisfies ApiRequestError;
    }
  },

  get<T>(endpoint: string, token: string | null = null): Promise<T> {
    return this.request<T>(endpoint, "GET", null, token);
  },

  post<T>(endpoint: string, data: unknown, token: string | null = null): Promise<T> {
    return this.request<T>(endpoint, "POST", data, token);
  },

  put<T>(endpoint: string, data: unknown, token: string | null = null): Promise<T> {
    return this.request<T>(endpoint, "PUT", data, token);
  },

  delete<T>(endpoint: string, token: string | null = null): Promise<T> {
    return this.request<T>(endpoint, "DELETE", null, token);
  },
};

export default ApiService;
