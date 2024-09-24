export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        return fetchSpotsApi('users/search', { method: 'post', body: { text: body.text }})
    } catch {
        return []
    }
})