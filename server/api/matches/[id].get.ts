export default defineEventHandler(async event => {
    try {
        return await fetchSpotsApi(`matches/${event.context.params.id}`)
    } catch (e) {
        throw createError({
            statusCode: 404,
            message: 'Match not found'
        })
    }
})