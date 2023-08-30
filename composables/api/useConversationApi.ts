import {ConversationMessagesModel, ConversationModel, MessageModel} from "~/app/models/conversation.model";
import useSecurity from "~/composables/useSecurity";
import axios from "axios";

export default function useConversationApi() {
    const { getToken } = useSecurity()

    async function fetchAuthConversationsList(): Promise<Array<ConversationModel>> {
        try {
            const { data } = await axios.get<Array<ConversationModel>>(
                "http://localhost:3333/users/conversations",
                { headers: { Authorization: "Bearer " + getToken() } }
            )
            return data;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async function fetchConversationMessages(conversationId: number): Promise<Array<MessageModel>> {
        try {
            const { data } =  await axios.get<ConversationMessagesModel>(
                "http://localhost:3333/users/conversations/" + conversationId,
                { headers: { Authorization: "Bearer " + getToken() } }
            )
            return data.messages
        } catch (error) {
            console.log("Une erreur s'est produite lors de l'appel à l'API :", error);
            return []
        }
    }

    return { fetchAuthConversationsList, fetchConversationMessages }
}