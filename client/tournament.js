import { client } from "@/client/clientApi";

export function tournaments() {
  return {
    async all(params) {
      const result = await client.get("tournaments", {
        params: params,
      });
      return result.data;
    },
    async get(id) {
      return await client.get("tournaments/" + id).catch((error) => {
        return error.response;
      });
    },
    async create(form) {
      return await client
        .post("tournaments", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    },
    async register(form) {
      return await client
        .post("tournaments/register", form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          return response.status;
        })
        .catch((error) => {
          return error.response.status;
        });
    },
    async hightlighted() {
      return await client
        .get("tournaments/highlights")
        .then((response) => response.data);
    },
    async start(tournament) {
      return await client.get("tournaments/" + tournament.id + "/start", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
    },
    async unsubscribe(tournament_id, user_id) {
      return await client.post(
        "tournaments/" + tournament_id + "/unsubscrire/" + user_id
      );
    },
  };
}
