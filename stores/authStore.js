import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    isAuthenticated: false,
    user: null,
  }),
  getters: {
    userName: (state) => (state.user ? state.user.name : "Guest"),
  },
  actions: {
    setToken(token) {
      console.log("Setting token:", token);
      this.token = token;
      this.isAuthenticated = true;

      if (process.client) {
        localStorage.setItem("token", token);
      }

      if (process.client) {
        const expires = new Date(Date.now() + 3600 * 1000).toUTCString();
        document.cookie = `token=${token}; expires=${expires}; path=/; secure; samesite=strict;`;
      }
    },

    setUser(user) {
      this.user = user;
      if (process.client) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    loadToken() {
      if (process.client) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        // Log token dan user untuk debugging
        console.log("Loaded token from localStorage:", token);
        console.log("Loaded user from localStorage:", user);

        if (token) {
          this.token = token;
          this.isAuthenticated = true;

          if (user) {
            try {
              this.user = JSON.parse(user);
            } catch (error) {
              console.error("Failed to parse user from localStorage:", error);
              this.user = null;
            }
          } else {
            this.user = null;
          }
        } else {
          this.token = null;
          this.isAuthenticated = false;
        }
      }
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.user = null;
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
  },
});
