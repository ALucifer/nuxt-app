import {getToken} from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if(!session) return

    const body = await readBody(event)

    try {
        return fetchSpotsApi(
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
        console.log(e.response.data.messages)
        return null
    }
})