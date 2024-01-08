import {getServerSession, getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const session = await getServerSession(event)
    if (!session || query.conversationId === '0') return

    try {
        const { data: messages } = await axiosInstance.get(
            '/users/conversations/' + query.conversationId,
            { headers: { Authorization: 'Bearer ' + session!.token}}
        )

        return messages
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
            data: {
                myCustomField: true
            }
        })
    }
})