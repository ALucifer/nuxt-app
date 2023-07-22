import AbstractClient from "~/app/client/DefaultClient";

export default class ConversationClient extends AbstractClient {
    async fetchAuthConversationsList() {
        const { data: auth } = useAuth()
        const { data } = await this.axiosInstance.get(
                "users/conversations",
                { headers: { Authorization: "Bearer " + auth.value.token } }
            )
        return data;
    }

    async fetchConversationMessages(conversationId: number) {
        const { data: auth } = useAuth()
        const { data } =  await this.axiosInstance.get(
            "users/conversations/" + conversationId,
            { headers: { Authorization: "Bearer " + auth.value.token } }
            )
        return data.messages
    }

    async sendMessage(form: { text: String, sendTo: number, conversation_id: number }) {
        const { data: auth } = useAuth()
        const { data } = await this.axiosInstance.post(
            "message",
            form,
            { headers: { Authorization: "Bearer " + auth.value.token }}
        )
        return data
    }

    async readMessage(message: any) {
        const { data: auth } = useAuth()
        const { status } = await this.axiosInstance.post(`message/${message.id}/read`, null, {
                headers: { Authorization: "Bearer " + auth.value.token },
            })
        return status
    }

    async createNewConversation(form: { sendFrom: number, sendTo: number, messages: { text: String }}) {
        const { data: auth } = useAuth()
        const { data } = await this.axiosInstance.post(
            "conversation",
            form,
            { headers: { Authorization: "Bearer " + auth.value.token }}
        )

        return data
    }
}