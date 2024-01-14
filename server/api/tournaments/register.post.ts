import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    const body = await readBody(event)

    try {
        const { status } = await axiosInstance.post(
            '/tournaments/register',
            { ...body, user_id: session.user.id },
            {
                headers: {
                    Authorization: 'Bearer ' + session.token
                }
            }
        )
        return status
    } catch (e) {
        return e.response.status
    }
})