import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
  }),
  actions: {
    login(userData) {
      this.user = userData; 
    },
    logout() {
      this.user = null; 
      navigateTo('/login');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user, 
  },
  persist: true
});
