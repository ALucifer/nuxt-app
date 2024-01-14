import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if(!session) return

    const body = await readBody(event)

    try {
        const { data } = await axiosInstance.post(
            'tournaments',
            body,
            {
                headers: {
                    Authorization: 'Bearer ' + session.token
                }
            }
        )

        return data
    } catch (e) {
        console.log(e.response.data.messages)
        return null
    }
})