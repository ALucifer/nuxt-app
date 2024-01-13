import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        const { data } = await axiosInstance.post('users/search', { text: body.text })

        return data
    } catch (e) {
        return []
    }
})