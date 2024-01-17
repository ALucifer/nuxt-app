import { getToken } from "#auth";

export default eventHandler(async (event) => {
    try {
        const session = await getToken({ event })
        if (!session) return

        return fetchSpotsApi(
            'users/conversations',
            {
                headers: { Authorization: 'Bearer ' + session!.token}
            }
        )
    } catch (e) {
        return []
    }
})