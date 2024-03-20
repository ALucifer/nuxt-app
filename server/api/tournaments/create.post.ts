import {getToken} from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if(!session) return

    const body = await readBody(event)

    try {
        return await fetchSpotsApi(
            'tournaments',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + session.token
                },
                body
            }
        )
    } catch (e) {
        throw createError({
            statusCode: 400,
            message: 'Une erreur est survenu lors de la création de votre tournoi'
        })
    }
})