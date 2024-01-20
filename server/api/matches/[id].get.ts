export default defineEventHandler(async event => {
    try {
        return await fetchSpotsApi(`matches/${event.context.params.id}`)
    } catch (e) {
        console.log('server api')
        return false
    }
})