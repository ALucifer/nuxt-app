import { getToken } from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) {
        throw createError({
            statusCode: 403,
            message: 'You are not authorize to perform this action.'
        })
    }

    const body = await readBody(event)

    try {
        await fetchSpotsApi(
            `/matches/${body.match_id}/scores`,
            {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + session!.token},
                body
            }
        )
    } catch (e) {
        throw createError({
            statusCode: e.statusCode,
            statusMessage: e.message
        })
    }
})