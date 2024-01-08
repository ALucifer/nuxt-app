import AbstractClient from "~/app/client/DefaultClient";
import {ConversationMessagesModel, ConversationModel, MessageForm, MessageModel} from "~/app/models/conversation.model";
import useSecurity from "@/composables/useSecurity";

export default class ConversationClient extends AbstractClient {
    async readMessage(message: MessageModel) {
        const { getToken } = useSecurity()
        const { status } = await this.axiosInstance.post(`message/${message.id}/read`, {}, {
                headers: { Authorization: "Bearer " + getToken() },
            })
        return status
    }
}