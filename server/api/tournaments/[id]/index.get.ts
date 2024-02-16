export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    return fetchSpotsApi(`tournaments/${id}`)
})