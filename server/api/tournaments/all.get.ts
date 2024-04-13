export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        return await fetchSpotsApi('tournaments', { params: query })
    } catch (e) {
        return []
    }
})