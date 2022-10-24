import { defineStore } from "pinia";
import { auth } from "../client/user";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: null,
      token: null,
    };
  },
  getters: {
    getUser() {
      const user = this.user;
      if (!user) return {};
      return {
        ...user,
        get pseudo() {
          return user.pseudo || user.email;
        },
      };
    },
    isAuthenticated() {
      return this.user ? true : false;
    },
  },
  actions: {
    async login({ form }) {
      const success = await auth().login(form);
      if (success) {
        this.user = await auth().me();
      }
      return success;
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
    },
    async fetchUser() {
      if (localStorage.getItem("token") && !this.isAuthenticated) {
        this.user = await auth().me();
      }
    },
    changeAvatar(e) {
      let formData = new FormData();
      formData.append("avatar", e.target.files[0]);

      auth()
        .uploadAvatar(formData)
        .then((response) => {
          this.user.avatar = response;
        });
    },
  },
});
