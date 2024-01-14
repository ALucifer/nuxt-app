import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    const body = await readBody(event)

    try {
        await axiosInstance.post(
            '/me/avatar',
            body,
            {
                headers: {
                    Authorization: 'Bearer ' + session.token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        return true
    } catch (e) {
        console.log(e)
        return false
    }
})