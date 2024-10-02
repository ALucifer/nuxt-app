import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await getToken({ event })
    if (!session) return

    return await fetchSpotsApi(
      `matches/${event.context.params.id}`,
      {
        headers: { Authorization: 'Bearer ' + session!.token },
      },
    )
  }
  catch (e) {
    throw createError({
      statusCode: 404,
      message: e.message,
    })
  }
})
