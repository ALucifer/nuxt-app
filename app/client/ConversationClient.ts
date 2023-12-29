import AbstractClient from "~/app/client/DefaultClient";
import {ConversationMessagesModel, ConversationModel, MessageForm, MessageModel} from "~/app/models/conversation.model";
import useSecurity from "@/composables/useSecurity";

export default class ConversationClient extends AbstractClient {
    async fetchAuthConversationsList(): Promise<ConversationModel[]> {
        try {
            const { getToken } = useSecurity()
            const { data } = await this.axiosInstance.get<ConversationModel[]>(
                "users/conversations",
                { headers: { Authorization: "Bearer " + getToken() } }
            )

            return data;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async fetchConversationMessages(conversationId: number): Promise<ConversationMessagesModel|null> {
        try {
            const { getToken } = useSecurity()
            const { data } =  await this.axiosInstance.get<ConversationMessagesModel>(
                "users/conversations/" + conversationId,
                { headers: { Authorization: "Bearer " + getToken() } }
            )
            return data
        } catch (error) {
            console.log("Une erreur s'est produite lors de l'appel à l'API :", error);
            return null
        }
    }

    async sendMessage(form: MessageForm): Promise<MessageModel> {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.post<MessageModel>(
            "message",
            form,
            { headers: { Authorization: "Bearer " + getToken() }}
        )

        return data
    }

    async readMessage(message: MessageModel) {
        const { getToken } = useSecurity()
        const { status } = await this.axiosInstance.post(`message/${message.id}/read`, {}, {
                headers: { Authorization: "Bearer " + getToken() },
            })
        return status
    }

    async createNewConversation(form: { sendFrom: number, sendTo: number, messages: { text: String }}) {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.post(
            "conversation",
            form,
            { headers: { Authorization: "Bearer " + getToken() }}
        )

        return data
    }
}