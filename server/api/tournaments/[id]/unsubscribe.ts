import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if(!session) return

    const id = getRouterParam(event, 'id')

    try {
        await axiosInstance.post(
            `/tournaments/${id}/unsubscribe`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + session.token
                }
            }
        )
        return { status: true }
    } catch (e) {
        return { status: false }
    }
})