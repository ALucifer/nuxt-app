import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id) as number

    try {
        const { data } = await axiosInstance.get(`/users/${id}`)

        return data
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        })
    }
})