import {getToken} from "#auth";
import {useLogger} from "@nuxt/kit";

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
         useLogger().error(e)

        throw createError({
            statusCode: 400,
            message: 'Une erreur est survenu lors de la création de votre tournoi'
        })
    }
})