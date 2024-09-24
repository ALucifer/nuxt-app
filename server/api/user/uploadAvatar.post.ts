import {getToken} from "#auth";
import type { MultiPartData } from "h3";

export default defineEventHandler(async event => {
    const session = await getToken({ event })
    if (!session) return createError({ statusCode: 403, message: 'You are not authorize to perform this action.'})

    try {
        const files = await readMultipartFormData(event)

        if (!files) {
            return createError({ statusCode: 400, message: 'Missing file.' })
        }

        const file: MultiPartData = files[0]

        const blob = new Blob([file.data], {type: file.type})
        const avatar = new File([blob], file.filename ?? 'file',  { type: files[0].type})

        const form = new FormData()
        form.append('avatar', avatar)

        return await fetchSpotsApi(
            'me/avatar',
            {
                method: 'POST',
                body: form,
                headers: {
                    Authorization: 'Bearer ' + session!.token,
                }
            }
        )
    } catch {
        return createError({ statusCode: 400, message: 'Something when wrong in upload avatar'})
    }
})