import { defineStore } from "pinia";
import { user } from "../client/user";

export const useUserStore = defineStore({
  id: "user",
  actions: {
    fetchUserById(id) {
      return new Promise(async (resolve) => {
        const result = await user().get(id);
        resolve(result);
      }).then((result) => {
        return result;
      });
    },
  },
});
