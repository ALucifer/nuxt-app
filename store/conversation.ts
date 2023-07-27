import {defineStore} from "pinia";
import {useUserStore} from "@/store/user";
import ConversationClient from "~/app/client/ConversationClient";
import {ConversationModel, MessageModel} from "~/app/models/conversation.model";

const conversationClient = new ConversationClient();
const { addMessage } = useFlashMessages()

export const useConversationStore = defineStore({
  id: "conversation",
  state: () => {
    return {
      conversations: [] as ConversationModel[],
      messages: [] as MessageModel[],
      active_conversation_id: null as null|number,
    };
  },
  getters: {
    currentConversation: (state): null|ConversationModel  =>{
      if (null === state.active_conversation_id) return null

      return state.conversations
          .find((conversation: ConversationModel) => conversation.id === state.active_conversation_id)!
    },
    getMessagesByConversationId: (state): (conversationId: number) => MessageModel[] => {
      return (conversationId: number) => state.messages.filter(
            (message: MessageModel) => message.conversation === conversationId
        );
    },
    getUnreadMessagesByConversation: (state): (conversation: ConversationModel) => MessageModel[] => {
      const { getUser } = useSecurity()
      return (conversation: ConversationModel) => state.messages.filter(
          (message: MessageModel) =>
            message.conversation === conversation.id
            && message.state === 'UNREAD'
            && message.to === getUser().id
      )
    },
  },

  actions: {
    async fetchConversations() {
      this.conversations = await conversationClient.fetchAuthConversationsList()
      this.active_conversation_id = this.conversations[0].id
    },

    async fetchMessagesByConversation(conversation: ConversationModel) {
      this.messages = await conversationClient.fetchConversationMessages(conversation.id)
    },

    async changeActiveConversation(conversation: ConversationModel) {
      this.active_conversation_id = conversation.id;
      await this.fetchMessagesByConversation(conversation);
    },

    async sendMessage(text: string) {
      if (!this.currentConversation || !this.active_conversation_id) {
        addMessage({
          message: 'Une erreur est survenu lors de l\'envoie du message',
          class: 'error'
        })
        return;
      }
      const message = await conversationClient.sendMessage({
        text: text,
        sendTo: this.currentConversation.interlocutor.id,
        conversation_id: this.active_conversation_id,
      });

      await this.addMessage(message);
    },

    isOwnMessage(message: MessageModel) {
      const { getUser } = useSecurity()
      return message.fromUser.id === getUser().id;
    },

    addMessage(message: MessageModel) {
      return new Promise((resolve) => {
        this.messages.push(message);
        resolve(true);
      });
    },
    async messageRead(message: MessageModel) {
      await conversationClient.readMessage(message);
      const index = this.messages.findIndex((i: MessageModel) => i == message);
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
        this.changeActiveConversation(conversation.id);
      }

      return conversation === undefined ? true : false;
    },

    async sendMessageToNewConversation({ text }) {
      const { data: auth } = useAuth();

      const data = await conversationClient.createNewConversation({
        sendFrom: auth.value.user.id,
        sendTo: this.currentConversation.interlocutor.id,
        messages: {
          text: text,
        },
      });

      this.messages.push(data.message);
      this.conversation.push(data.conversation);
      this.changeActiveConversation(data.conversation.id);
    },
  },
});
