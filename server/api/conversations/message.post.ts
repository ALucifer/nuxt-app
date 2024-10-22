import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const body = await readBody(event)

  try {
    return await fetchSpotsApi(
      'message',
      {
        method: 'POST',
        body: body,
        headers: { Authorization: 'Bearer ' + session.token },
      },
    )
  }
  catch {
    throw createError({
      statusCode: 404,
      message: 'Une erreur est survenue.',
    })
  }
})
