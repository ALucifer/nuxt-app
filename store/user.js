import { defineStore } from "pinia";
import UserClient from "~/app/client/UserClient";

const userClient = new UserClient()

export const useUserStore = defineStore({
  id: "user",
  actions: {
    fetchUserById(id) {
      return new Promise(async (resolve) => {
        const result = await userClient.get(id);
        resolve(result);
      }).then((result) => {
        return result;
      });
    },
  },
});
