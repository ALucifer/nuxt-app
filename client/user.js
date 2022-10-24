import { client } from "@/client/clientApi";

export function user() {
  return {
    async register(form) {
      return await client
        .post("http://127.0.0.1:3333/users/register", form, {
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

    async get(id) {
      return await client
        .get("http://127.0.0.1:3333/users/" + id)
        .then((response) => {
          return response.data;
        });
    },
  };
}

export function auth() {
  return {
    async login(form) {
      return await client
        .post("users/login", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          return true;
        })
        .catch((error) => {
          return false;
        });
    },
    async me() {
      return await client
        .get("me", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          localStorage.removeItem("token");
        });
    },
    async uploadAvatar(avatar) {
      return await client
        .post("me/avatar", avatar, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
}

export const conversations = {
  async fetchAuthConversationsList(authId) {
    return await client
      .get("users/" + authId + "/conversations", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        return response.data;
      });
  },

  async fetchConversationMessages(authId, conversationId) {
    return await client
      .get("users/" + authId + "/conversations/" + conversationId, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        return response.data.messages || [];
      });
  },

  async sendMessage(form) {
    return await client
      .post("message", form, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.data);
  },

  async readMessage(message) {
    return await client
      .post(`message/${message.id}/read`, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.status);
  },

  async createNewConversation(form) {
    return await client
      .post("conversation", form, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.data);
  },
};

export const search = {
  async user(username) {
    try {
      const { data } = await client.post("users/search", { text: username });
      return data;
    } catch (err) {
      return [];
    }
  },
};
