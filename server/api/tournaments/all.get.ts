export default defineEventHandler((event) => {
    try {
        const query = getQuery(event)
        return fetchSpotsApi('tournaments', { params: query })
    } catch (e) {
        return []
    }
})