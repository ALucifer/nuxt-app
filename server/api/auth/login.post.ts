export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        return await fetchSpotsApi(
            'users/login', 
            {
                method: 'POST',
                body
            }
        )
    } catch {
        throw createError({ statusCode: 404, message: 'user not found' })
    }
})