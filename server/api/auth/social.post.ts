import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)
        const { data } = await axiosInstance.post('/oauth/login', body.form)
        return data
    } catch (error) {
        return false
    }
})