import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
}

interface TokenState {
  token: string | null;
  loggedIn: boolean;
  refreshToken: string | null;
  expiresAt: number | null;
}

export const useTokenStore = defineStore("token", {
  state: (): TokenState => ({
    token: null,
    loggedIn: false,
    refreshToken: null,
    expiresAt: null,
  }),

  persist: true,

  getters: {
    getToken: (state): string | null => state.token,
    getStatus: (state): boolean => state.loggedIn,
    getRefreshToken: (state): string | null => state.refreshToken,
    isTokenExpired: (state): boolean =>
      state.expiresAt === null || Date.now() >= state.expiresAt * 1000,
  },

  actions: {
    setToken(token: string, refreshToken: string | null = null): void {
      const decoded = jwtDecode<JwtPayload>(token);
      this.token = token;
      this.refreshToken = refreshToken;
      this.expiresAt = decoded.exp ?? null;
      this.loggedIn = true;
    },

    removeToken(): void {
      this.$reset();
    },
  },
});
