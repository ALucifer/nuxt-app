export default defineEventHandler(async () => {
    try {
        return fetchSpotsApi('tournaments/highlights')
    } catch (e) {
        return []
    }
})