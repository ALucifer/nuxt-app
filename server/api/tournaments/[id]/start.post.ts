import {getToken} from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    try {
        const id = getRouterParam(event, 'id')

        await fetchSpotsApi(
            `/tournaments/${id}/start`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + session.token,
                },
            },
        )
        return true
    } catch {
        return false
    }
})