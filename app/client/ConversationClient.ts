import AbstractClient from "~/app/client/DefaultClient";
import {ConversationMessagesModel, ConversationModel, MessageForm, MessageModel} from "~/app/models/conversation.model";
import useSecurity from "@/composables/useSecurity";

export default class ConversationClient extends AbstractClient {
    async fetchAuthConversationsList(): Promise<Array<ConversationModel>> {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.get<Array<ConversationModel>>(
                "users/conversations",
                { headers: { Authorization: "Bearer " + getToken() } }
            )
        return data;
    }

    async fetchConversationMessages(conversationId: number): Promise<Array<MessageModel>> {

        try {
            const { getToken } = useSecurity()
            const { data } =  await this.axiosInstance.get<ConversationMessagesModel>(
                "users/conversations/" + conversationId,
                { headers: { Authorization: "Bearer " + getToken() } }
            )
            return data.messages
        } catch (error) {
            console.log("Une erreur s'est produite lors de l'appel à l'API :", error);
            return []
        }
    }

    async sendMessage(form: MessageForm) {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.post(
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