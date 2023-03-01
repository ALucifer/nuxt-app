import { defineStore } from "pinia";
import { auth, user } from "../client/user";

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
      return state.user ? true : false;
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
    // async loadUserMatchs(tournament_id) {
    //   if (
    //     this.matches &&
    //     dayjs().diff(this.matches.lastUpdate, "m") < 3 &&
    //     this.team.tournament_id === tournament_id
    //   ) {
    //     return;
    //   } else {
    //     const team = await user().getTeam(tournament_id);
    //     this.team = { lastUpdate: dayjs(), ...team };
    //   }
    // },
  },
});
