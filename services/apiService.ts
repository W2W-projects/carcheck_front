import { useTokenStore } from "@/stores/token";
import type { ApiErrorBody, ApiRequestError } from "~/types/models";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ConditionalResponse<T> {
  data: T | null;
  etag: string | null;
  notModified: boolean;
}

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

const buildHeaders = (token: string | null): Record<string, string> => {
  const tokenToUse = token || useTokenStore().getToken;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const guest = guestToken();
  if (guest) headers["X-Guest-Token"] = guest;
  if (tokenToUse) headers.Authorization = `Bearer ${tokenToUse}`;

  return headers;
};

const toRequestError = (error: unknown, method: string, endpoint: string): ApiRequestError => {
  const failure = error as { status?: number; statusCode?: number; data?: ApiErrorBody };

  console.error(`${method} ${endpoint} error:`, failure.status, failure.data?.message);

  return {
    status: failure.status ?? failure.statusCode ?? 0,
    data: failure.data ?? { message: "The request could not be completed." },
  };
};

const ApiService = {
  async request<T>(
    endpoint: string,
    method: HttpMethod,
    data: unknown = null,
    token: string | null = null,
  ): Promise<T> {
    const headers = buildHeaders(token);

    try {
      return await $fetch<T>(`${PROXY_PREFIX}/${endpoint.replace(/^\/+/, "")}`, {
        method,
        headers,
        body: data === null ? undefined : data,
        retry: 0,
      });
    } catch (error) {
      throw toRequestError(error, method, endpoint);
    }
  },

  get<T>(endpoint: string, token: string | null = null): Promise<T> {
    return this.request<T>(endpoint, "GET", null, token);
  },

  async getConditional<T>(
    endpoint: string,
    etag: string | null = null,
    token: string | null = null,
  ): Promise<ConditionalResponse<T>> {
    const headers = buildHeaders(token);
    if (etag) headers["If-None-Match"] = etag;

    try {
      const response = await $fetch.raw<T>(
        `${PROXY_PREFIX}/${endpoint.replace(/^\/+/, "")}`,
        { method: "GET", headers, retry: 0, cache: "no-store" },
      );

      return {
        data: response._data ?? null,
        etag: response.headers.get("etag"),
        notModified: response.status === 304,
      };
    } catch (error) {
      throw toRequestError(error, "GET", endpoint);
    }
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
