export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id) as number

    try {
        return fetchSpotsApi(`/users/${id}`)
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        })
    }
})