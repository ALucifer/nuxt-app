import {getToken} from "#auth";
import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const session = await getToken({event})
    if (!session) return

    const body = await readBody(event)

    try {
        const { data } = await axiosInstance.post(
            'conversation',
            body.form,
            { headers: { Authorization: 'Bearer ' + session.token } }
        )

        return data
    } catch (e) {
        console.log(e)
    }
})