import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    try {
        await axiosInstance.post('/contact', body)
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
        })
    }
})