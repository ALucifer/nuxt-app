import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    try {
        const id = getRouterParam(event, 'id')

        await axiosInstance.post(
            `/tournaments/${id}/start`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + session.token
                }
            }
        )
        return true
    } catch (e) {
        return false
    }
})