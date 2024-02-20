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
        throw  createError({
            statusCode: e.response.status,
            message: 'une erreur est survenur lors de la mise à jour de l\'avatar'
        })
    }
})