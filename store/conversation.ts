import {
    ConversationMessagesModel,
    ConversationModel,
    InterlocutorModel,
    MessageModel,
} from "~/app/models/conversation.model";

export const useConversationStore = defineStore('conversation', {
    state() {
        return {
            conversations: [] as ConversationMessagesModel[],
            currentConversation: null as ConversationMessagesModel | null
        }
    },
    actions: {
        async fetchConversations() {
            const headers = useRequestHeaders(['cookie']) as HeadersInit
            this.conversations = await $fetch('/api/conversations/list', { headers })
        },
        async fetchCurrentConversationMessages() {
            const headers = useRequestHeaders(['cookie']) as HeadersInit
            const conversationWithMessages = await $fetch(
                '/api/conversations/messages',
                { headers, query: { conversationId: this.currentConversation!.id } }
            )

            this.currentConversation!.messages = conversationWithMessages
            const index = this.conversations.findIndex((c) => c.id === this.currentConversation!.id)
            this.conversations[index].messages = conversationWithMessages
        },
        createNewConversation (user: InterlocutorModel, sendTo: number) {
            const { getUser } = useSecurity()
            this.conversations.unshift({ interlocutor: user, id: 0, send_from: getUser().id, send_to: sendTo  } as ConversationMessagesModel)
        },
        initCurrentConversation() {
            this.currentConversation = this.conversations.length > 0 ? this.conversations[0] : null
        },
        setCurrentConversation(conversation: ConversationMessagesModel) {
            this.currentConversation = conversation
        },
        async sendMessage(text: string) {
            const message = await $fetch<MessageModel>('/api/conversations/message', {
                method: 'post',
                body: {
                    form: {
                        text: text,
                        sendTo: this.currentConversation!.interlocutor.id,
                        conversation_id: this.currentConversation!.id
                    }
                }
            })

            if (message) {
                this.currentConversation!.messages.push(message)
            }
        },
        async sendMessageToNewConversation(text: string) {
            const conversation = await $fetch(
                '/api/conversations/new',
                {
                    method: 'post',
                    body: {
                        form: {
                            sendFrom: this.currentConversation!.send_from,
                            sendTo: this.currentConversation!.send_to,
                            messages: {
                                text: text
                            }
                        }
                    }
                }
            )

            const index = this.conversations.findIndex((c) => c.id === this.currentConversation!.id)
            this.currentConversation = conversation
            this.conversations[index] = conversation
        },
        messageHasArrived(message: MessageModel) {
            const index = this.conversations.findIndex(c => c.id === message.conversation)
            if (index === -1) {
                console.log('Nouvelle conversation incomming')
                // this.conversations.push()
            } else {
                this.conversations[index]?.messages.push(message)
            }
        },
        async messageRead(message: MessageModel) {
            await $fetch(
                '/api/conversations/readMessage',
                {
                    method: 'POST',
                    body: message
                }
            )
            const index = this.conversations.findIndex(c => c.id === message.conversation)
            this.conversations[index].total_messages_unread--
        }
    },
});
