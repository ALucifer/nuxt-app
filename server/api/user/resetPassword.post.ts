export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        await fetchSpotsApi('reset-password', { method: 'POST', body })

        return true
    } catch {
        return false
    }
})