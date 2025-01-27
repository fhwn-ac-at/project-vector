import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
    }),
    actions: {
        login(userData) {
            this.accessToken = userData;
        },
        logout() {
            this.accessToken = null;
            navigateTo("/login");
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        getAccessToken: (state) => state.accessToken || "",
    },
    persist: true,
});
