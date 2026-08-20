import { useTokenStore } from "@/stores/token";
import type { ApiErrorBody, ApiRequestError } from "~/types/models";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const appEnv = import.meta.env.VITE_APP_ENV as string | undefined;
const baseUrl = import.meta.env.VITE_LOCAL_BASE_URL as string | undefined;
const testBaseUrl = import.meta.env.VITE_TEST_BASE_URL as string | undefined;
const productionUrl = import.meta.env.VITE_PROD_BASE_URL as string | undefined;

const setBaseUrl = (environment?: string): string => {
  const urls: Record<string, string> = {
    local: baseUrl || "http://localhost/api",
    dev: testBaseUrl || "https://dev-back.car-check.info/api",
    prod: productionUrl || "https://car-check.io/api",
  };

  return urls[environment || "local"] || "http://localhost/api";
};

const guestToken = (): string | null => {
  if (typeof localStorage === "undefined") return null;

  let existing = localStorage.getItem("guest_token");
  if (!existing) {
    existing = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
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

    const options: RequestInit = { method, headers };
    if (data !== null) options.body = JSON.stringify(data);

    try {
      const response = await fetch(`${setBaseUrl(appEnv)}/${endpoint}`, options);
      const responseData = (await response.json()) as T;

      if (!response.ok) {
        throw {
          status: response.status,
          data: responseData as ApiErrorBody,
        } satisfies ApiRequestError;
      }

      return responseData;
    } catch (error) {
      console.error(`${method} ${endpoint} error:`, error);
      throw error;
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
