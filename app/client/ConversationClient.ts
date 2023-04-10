import AbstractClient from "~/app/client/DefaultClient";

export default class ConversationClient extends AbstractClient {
    async fetchAuthConversationsList() {
        const { data } = await this.axiosInstance.get(
                "users/conversations",
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            )
        return data;
    }

    async fetchConversationMessages(conversationId: number) {
        const { data } =  await this.axiosInstance.get(
            "users/conversations/" + conversationId,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            )
        return data.messages
    }

    async sendMessage(form: { text: String, sendTo: number, conversation_id: number }) {
        const { data } = await this.axiosInstance.post(
            "message",
            form,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
        )
        return data
    }

    async readMessage(message: any) {
        const { status } = await this.axiosInstance.post(`message/${message.id}/read`, null, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
        return status
    }

    async createNewConversation(form: { sendFrom: number, sendTo: number, messages: { text: String }}) {
        const { data } = await this.axiosInstance.post(
            "conversation",
            form,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
        )

        return data
    }
}