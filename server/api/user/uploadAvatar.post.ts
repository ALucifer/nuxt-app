import {getToken} from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return

    const formData = await readFormData(event);

    console.log(formData)

    try {
        await fetchSpotsApi(
            '/me/avatar',
            {
                method: 'post',
                // body: formData,
                headers: {
                    Authorization: 'Bearer ' + session!.token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        return true
    } catch (e) {
        // console.log(e.response._data)
        throw  createError({
            statusCode: e.response.status,
            message: 'une erreur est survenur lors de la mise à jour de l\'avatar'
        })
    }
})