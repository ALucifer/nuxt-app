import { useConversationStore } from "~/store/Conversation";
import { ConversationMessagesModel } from "~/app/models/conversation.model";

export default async function useFetchMessagesByConversation() {
    const { currentConversation, addMessagesByConversation } = useConversationStore()

    if (!currentConversation) return {}

    const { data } = await useFetch<ConversationMessagesModel>('/api/conversations/messages', {
        query: { conversationId: currentConversation.id}
    })

    // @ts-ignore
    addMessagesByConversation(data.value.messages)

    return {}
}