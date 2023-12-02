import { useConversationStore } from "~/store/conversation";

export default async function useFetchConversationsList() {
    const { setConversations } = useConversationStore()
    const { data, pending } = await useFetch('/api/conversations/list')

    setConversations(data.value.conversations)

    return { pending }
}