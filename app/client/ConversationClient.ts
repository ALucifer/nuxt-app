import AbstractClient from "~/app/client/DefaultClient";

export default class ConversationClient extends AbstractClient {
    async fetchAuthConversationsList() {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.get(
                "users/conversations",
                { headers: { Authorization: "Bearer " + getToken() } }
            )
        return data;
    }

    async fetchConversationMessages(conversationId: number) {
        const { getToken } = useSecurity()
        const { data } =  await this.axiosInstance.get(
            "users/conversations/" + conversationId,
            { headers: { Authorization: "Bearer " + getToken() } }
            )
        return data.messages
    }

    async sendMessage(form: { text: String, sendTo: number, conversation_id: number }) {
        const { getToken } = useSecurity()
        const { data } = await this.axiosInstance.post(
            "message",
            form,
            { headers: { Authorization: "Bearer " + getToken() }}
        )
        return data
    }

    async readMessage(message: any) {
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