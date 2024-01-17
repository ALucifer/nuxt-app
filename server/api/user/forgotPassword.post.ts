export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        await fetchSpotsApi('forgot-password', { method: 'POST', body })

        return true
    } catch (error) {
        return false
    }
})