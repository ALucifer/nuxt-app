import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const { status } = await axiosInstance.post('/users/register', body)

        return status
    } catch (e) {
        return e.response.status
    }
})