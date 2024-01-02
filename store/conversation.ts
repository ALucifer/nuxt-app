import ConversationClient from "~/app/client/ConversationClient";
import {ConversationMessagesModel, ConversationModel, MessageModel} from "~/app/models/conversation.model";
import useFlashMessages from "~/composables/useFlashMessages";

const conversationClient = new ConversationClient();

export const useConversationStore = defineStore({
  id: "conversation",
  state: () => {
    return {
      conversations: [] as ConversationModel[],
      messages: [] as Array<MessageModel[]>,
      currentConversation: null as ConversationModel|null,
    };
  },
  getters: {
    getMessagesByConversation: (state): (conversation: ConversationModel) => MessageModel[] => {
      return (conversation: ConversationModel) => state.messages[conversation.id]
    },
    getUnreadMessagesByConversation: (state): (conversation: ConversationModel) => MessageModel[] => {
      const { getUser } = useSecurity()

      return (conversation: ConversationModel) => !state.messages[conversation.id]
          ? []
          : state.messages[conversation.id].filter(
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
    },

    async fetchCurrentConversation() {
      console.log(this.currentConversation)
      if (!this.currentConversation || this.currentConversation?.isNew) return
      const conversation = await conversationClient.fetchConversationMessages(this.currentConversation.id)
      if (conversation) {
        this.addMessagesByConversation(conversation)
      }
    },

    createNewConversation(user) {
      const conversation = { interlocutor: user, isNew: true }
      this.conversations.unshift(conversation)
    },

    setCurrentConversation (conversation?: ConversationModel) {
      if (this.conversations.length === 0) return
      if (!conversation) {
        this.currentConversation = this.conversations[0]
      } else {
        this.currentConversation = this.conversations.find((c: ConversationModel) => c.id === conversation.id)!
      }
    },










    addMessagesByConversation(conversation: ConversationMessagesModel) {
      this.messages[conversation.id] = conversation.messages
    },

    addMessage(message: MessageModel) {
        this.messages[message.conversation].push(message);
    },

    async sendMessage(text: string) {
      const { addMessage } = useFlashMessages()

      if (!this.currentConversation) {
        addMessage({
          message: 'Une erreur est survenu lors de l\'envoie du message',
          class: 'error'
        })
        return;
      }
      const message = await conversationClient.sendMessage({
        text: text,
        sendTo: this.currentConversation.interlocutor.id,
        conversation_id: this.currentConversation.id,
      });

      await this.addMessage(message);
    },

    isOwnMessage(message: MessageModel) {
      /**
       * Voir pour le passer en getter ou en composable
       */
      const { getUser } = useSecurity()
      return message.fromUser.id === getUser().id;
    },

    async messageRead(message: MessageModel) {
      await conversationClient.readMessage(message);
      const index = this.messages[message.conversation].findIndex(
          (item: MessageModel) => {
            return message.id === item.id;
          }
      );
      this.messages[message.conversation][index].state = "READ";
    },
  },
});
