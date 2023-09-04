import { useConversationStore } from "~/store/Conversation";

export default async function useFetchConversationsList() {
    const { setConversations } = useConversationStore()
    const { data, pending } = await useFetch('/api/conversations/list')

    setConversations(data.value.conversations)

    return { pending }
}