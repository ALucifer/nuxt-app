import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        await axiosInstance.post('/forgot-password', body)
        return true
    } catch (error) {
        return false
    }
})