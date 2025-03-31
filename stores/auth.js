import ApiService from "~/services/apiService";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }),
  getters: {
    getCurrentUser: (state) => state.user || null,
    isAuthenticated: (state) => !!state.user,
  },
  persist: {
    paths: ["user"],
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    removeUser() {
      this.user = null;
    },
    async makeLogin(form) {
      try {
        const response = await ApiService.post("login", form);
        if (response && response.payload) {
          let res = response.payload;
          const tokenStore = useTokenStore();
          const subscriptionStore = useSubscriptionStore();
          const hasSubscriptionStore = useSubscriptionStore();

          tokenStore.setToken(res.access_token, res.refresh_token);
          if (res.subscription && res.subscription.plan) {
            await subscriptionStore.setCurrentSubscription(res.subscription);
          }
          if (res.hasSubscription) {
            await hasSubscriptionStore.setHasSubscription(res.hasSubscription);
          }
          this.setUser(res.user);
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async createNewUser(form) {
      try {
        const response = await ApiService.post("users", form);
        if (response.payload) {
          this.setCommonSetter(response.payload);
        }
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      const tokenStore = useTokenStore();
      const carRegistrationSearchStore = useCarRegistrationSearchStore();
      try {
         ApiService.post("logout", null, tokenStore.token);
        this.removeUser();
        tokenStore.removeToken();
        const subscription = useSubscriptionStore();
        subscription.setHasSubscription({
          auth: false,
          active: false,
          subscription_type: null,
          request_count: 0,
        });
        localStorage.clear();
        sessionStorage.clear();

        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date(0).toUTCString() + ";path=/"
            );
        });

        // Clear all types of cache
        if ("caches" in window) {
          // Clear Cache Storage API
          caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
          });
        }

        // Clear Application Cache (if available)
        if (window.applicationCache) {
          window.applicationCache.abort();
        }

        // Clear Service Worker Cache
        if (navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
          });
        }

        // Clear Memory Cache and Browser Cache
        if (window.performance && window.performance.clearResourceTimings) {
          window.performance.clearResourceTimings();
        }

        carRegistrationSearchStore.$reset();
        this.$reset();
        window.location.reload();
      } catch (error) {
        throw error;
      }
    },

    async fetchUserRolesAndPermissions() {
      const tokenStore = useTokenStore();
      try {
        return await ApiService.get(
          "user/fetch-users-role-and-permissions",
          tokenStore.token
        );
      } catch (error) {
        throw error;
      }
    },

    async fetchUserCars(page = 1, perPage = 1) {
      const tokenStore = useTokenStore();
      try {
        return await ApiService.get(
          `v1/user/cars?page=${page}&perPage=${perPage}`,
          tokenStore.token
        );
      } catch (error) {
        throw error;
      }
      ß;
    },

    setCommonSetter(payload) {
      const token = useTokenStore();
      if (payload.access_token && payload.user) {
        token.setToken(payload.access_token);
        this.user = payload.user;
      }
    },

    async submitEmailForPasswordReset(form) {
      try {
        return await ApiService.post("users/verify-email", form);
      } catch (error) {
        throw error;
      }
    },

    async submitTokenForPasswordReset(form) {
      try {
        return await ApiService.post("users/verify-reset-token", form);
      } catch (error) {
        throw error;
      }
    },

    async handlePasswordResetSubmit(form) {
      try {
        return await ApiService.post("users/change-password", form);
      } catch (error) {
        throw error;
      }
    },

    async fetchUserDetails() {
      try {
        const res = await ApiService.get("users/details");

        if (res && res.data) {
            this.setUser({ ...this.user, ...res.data });
        }
        
      } catch (error) {
        throw error;
      }
    },
    async updateUserDetails(form) {
      try {
        const username = this.user.username;
      const res = await ApiService.put(`users/${username}`, form);
      if (res && res.data) {
        this.setUser({ ...this.user, ...res.data });
      }
      return res;
      } catch (error) {
      throw error;
      }
    },
    async updatePassword(form) {
      try {

      form.email = this.user.email;
        return await ApiService.post("users/change-password", form);
      } catch (error) {
        throw error;
      }

    }
  },
});
