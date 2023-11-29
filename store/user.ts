import { defineStore } from "pinia";
import UserClient from "~/app/client/UserClient";

const userClient = new UserClient()

export const useUserStore = defineStore({
  id: "user",
  actions: {
    fetchUserById(id: number) {
      return new Promise(async (resolve) => {
        const result = await userClient.get(id);
        resolve(result);
      }).then((result) => {
        return result;
      });
    },
    changeAvatar(e: any) {
      let formData = new FormData();
      formData.append("avatar", e.target.files[0]);

      const { setAvatar } = useSecurity()
      const { errorMessage } = useFlashMessages()

      userClient
          .uploadAvatar(formData)
          .then((response) => {
            setAvatar(response)
            // this.user.avatar = response;
          }).catch((error) => {
            errorMessage('Une erreur est survenu lors de la mise à jour de votre avatar.')
          });
    },
  },
});
