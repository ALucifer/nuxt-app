import { defineStore } from "pinia";
import { conversations } from "../client/user";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { sumBy, map } from "lodash";

export const useConversationStore = defineStore({
  id: "conversation",
  state: () => {
    return {
      conversations: [],
      messages: [],
      active_conversation_id: null,
    };
  },
  getters: {
    currentConversation: (state) => {
      if (state.conversations.length === 0) return null;
      const conversation =
        state.conversations.find(
          (item) => item.id === state.active_conversation_id
        ) || state.conversations[0];
      state.active_conversation_id = conversation.id;
      return conversation;
    },
    getMessagesByConversationId: (state) => {
      return (conversationId) =>
        state.messages.filter(
          (message) => message.conversation === conversationId
        );
    },
    getUnreadMessagesByConversationId: (state) => {
      const authStore = useAuthStore();

      return (conversationId) => {
        if (!conversationId) {
          return state.messages.filter(
            (message) =>
              message.state === "UNREAD" && message.to === authStore.user.id
          );
        }
        return state.messages.filter(
          (message) =>
            message.conversation === conversationId &&
            message.state === "UNREAD" &&
            message.to === authStore.user.id
        );
      };
    },
  },

  actions: {
    async fetchConversations() {
      const authStore = useAuthStore();
      this.conversations = await conversations.fetchAuthConversationsList(
        authStore.user.id
      );
    },

    async fetchMessages() {
      const authStore = useAuthStore();
      const messages = await conversations.fetchConversationMessages(
        authStore.user.id,
        this.currentConversation.id
      );

      this.messages = messages;
    },

    async changeActiveConversation({ id }) {
      this.active_conversation_id = id;
      await this.fetchMessages();
    },

    async sendMessage({ text }) {
      const message = await conversations.sendMessage({
        text: text,
        sendTo: this.currentConversation.interlocutor.id,
        conversation_id: this.active_conversation_id,
      });
      this.addMessage(message);
    },

    isOwnMessage(message) {
      const authStore = useAuthStore();
      return message.fromUser.id === authStore.user.id;
    },

    addMessage(message) {
      return new Promise((resolve, reject) => {
        this.messages.push(message);
        resolve(true);
      });
    },
    async messageRead(message) {
      await conversations.readMessage(message);
      const index = this.messages.findIndex((i) => i == message);
      this.messages[index].state = "READ";
    },

    // A refacto

    async createNewConversation({ user_id }) {
      const userStore = useUserStore();
      const user = await userStore.fetchUserById(user_id);
      this.active_conversation_id = 0;
      this.conversations.push({
        id: 0,
        interlocutor: user,
      });
    },

    async isNewConversation({ user_id }) {
      const conversation = this.conversations.find(
        (conversation) => conversation.interlocutor.id === user_id
      );

      if (conversation) {
        this.changeActiveConversation({ id: conversation.id });
      }

      return conversation === undefined ? true : false;
    },

    async sendMessageToNewConversation({ text }) {
      const authStore = useAuthStore();
      const form = {
        sendFrom: authStore.user.id,
        sendTo: this.currentConversation.interlocutor.id,
        messages: {
          text: text,
        },
      };
      const data = await conversations.createNewConversation(form);

      this.messages.push(data.message);
      this.conversation.push(data.conversation);
      this.changeActiveConversation(data.conversation.id);
    },
  },
});
