export default defineEventHandler(async () => {
    try {
        return await fetchSpotsApi('tournaments/highlights')
    } catch (e) {
        return []
    }
})