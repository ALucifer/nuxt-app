import { defineStore } from "pinia";
import AuthClient from "~/app/client/AuthClient";
import UserClient from "~/app/client/UserClient";

const authClient = new AuthClient()
const userClient = new UserClient()

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: null,
      token: null,
      team: null,
    };
  },
  getters: {
    getUser(state) {
      const user = state.user;
      if (!user) return {};
      return {
        ...user,
        get pseudo() {
          return user.pseudo || user.email;
        },
      };
    },
    isAuthenticated(state) {
      return !!state.user;
    },
  },
  actions: {
    async login({ form }) {
      this.user = await authClient.login(form)
      return !!this.user;
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
    },
    async fetchUser() {
      if (localStorage.getItem("token") && !this.isAuthenticated) {
        this.user = await authClient.me();
      }
    },
    changeAvatar(e) {
      let formData = new FormData();
      formData.append("avatar", e.target.files[0]);

      userClient
        .uploadAvatar(formData)
        .then((response) => {
          this.user.avatar = response;
        });
    },
  },
});
