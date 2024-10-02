import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const id = getRouterParam(event, 'id')

  try {
    return await fetchSpotsApi(
      `/tournaments/${id}/unsubscribe`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + session.token,
        },
      },
    )
  }
  catch (e) {
    throw createError({
      statusCode: e.statusCode,
      message: 'An error occurred on unsubscribe',
    })
  }
})
