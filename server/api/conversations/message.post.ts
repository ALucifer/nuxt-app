import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";
import {MessageModel} from "~/app/models/conversation.model";

export default defineEventHandler(async (event): Promise<MessageModel|undefined> => {
    const session = await getToken({ event })
    if(!session) return

    const body = await readBody(event)

    try {
        const { data } = await axiosInstance.post(
            "message",
            body.form,
            { headers: { Authorization: 'Bearer ' + session.token}}
        )

        return data
    } catch (e) {
        console.log(e)
        return
    }
})