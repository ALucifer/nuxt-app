import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        const { data } = await axiosInstance.post('users/login', body)
        return data
    } catch (e) {
        throw createError({ statusCode: 404, message: 'user not found' })
    }
})