import type { ConversationMessagesModel, MessageModel } from '~/types/api/conversations'

export function useConversations() {
  const conversations = useState<ConversationMessagesModel[]>('conversations', () => [])
  const currentConversationId = ref(0)

  const messages = computed(() => {
    console.log('messages')
    if (currentConversationId.value === 0) return []

    return conversations.value[currentConversationId.value].messages
  })

  const addConversation = (conversation: ConversationMessagesModel) => {
    conversations.value[conversation.id] = conversation
  }

  const conversationHasLoaded = (conversation: ConversationMessagesModel) => {
    return conversations.value[conversation.id] === conversation
  }

  const initMessagesToConversation = async (messages: MessageModel[], conversationId: number) => {
    conversations.value[conversationId].messages = messages
  }

  const setCurrentConversationId = (conversation: ConversationMessagesModel) => {
    currentConversationId.value = conversation.id
  }

  const addMessageToConversation = async (message: MessageModel) => {
    conversations.value[currentConversationId.value].messages.unshift(message)
  }

  const addMessagesToConversation = async (messages: MessageModel[]) => {
    conversations.value[currentConversationId.value].messages = [...conversations.value[currentConversationId.value].messages, ...messages]
  }

  return {
    addConversation,
    conversationHasLoaded,
    initMessagesToConversation,
    setCurrentConversationId,
    addMessageToConversation,
    addMessagesToConversation,
    messages,
  }
}
