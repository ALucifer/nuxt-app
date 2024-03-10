import {getToken} from "#auth";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return createError({ statusCode: 403, message: 'You are not authorize to perform this action.'})

    try {
        const files = await readMultipartFormData(event)
        if (!files) return createError({ statusCode: 400, message: 'Files are empty.'})

        for (const file of files) {
            console.log(file)
        }

        return { message: 'ok' }

    } catch (error) {
        return createError({ statusCode: 500, message: 'Something went wrong with your api.' })
    }
})