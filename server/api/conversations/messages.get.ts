import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const session = await getServerSession(event)
        if (!session || query.conversationId === '0') return

        return fetchSpotsApi(
            'users/conversations/' + query.conversationId,
            { headers: { Authorization: 'Bearer ' + session!.token}}
        )
    } catch (e) {
        return []
    }
})