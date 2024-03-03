export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        console.log(query)
        return await fetchSpotsApi('tournaments', { params: query })
    } catch (e) {
        console.log(e)
        return []
    }
})