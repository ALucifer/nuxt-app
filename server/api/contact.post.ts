export default defineEventHandler(async event => {
    const body = await readBody(event)
    try {
        await fetchSpotsApi(
            'contact',
            {
                method: 'POST',
                body
            }
        )
    } catch {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
        })
    }
})