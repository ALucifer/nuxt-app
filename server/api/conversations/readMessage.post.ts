import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    const body = await readBody(event)

    try {
        await axiosInstance.post(
            `/message/${body.id}/read`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + session.token
                }
            }
        )
    } catch (e) {
        console.log(e.message)
    }
})