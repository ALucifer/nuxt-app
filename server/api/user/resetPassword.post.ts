import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        await axiosInstance.post('/reset-password', body)
        return true
    } catch (e) {
        return false
    }
})