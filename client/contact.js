import { client } from "@/client/clientApi";

export function contact() {
  return {
    async post(form) {
      return await client
        .post("contact", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response.status;
        })
        .catch((error) => {
          return error.response.status;
        });
    },
  };
}
