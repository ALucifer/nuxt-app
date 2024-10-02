import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const body = await readBody(event)

  try {
    await fetchSpotsApi(
      'tournaments/register',
      {
        method: 'POST',
        body: {
          ...body,
          user_id: session.user.id,
        },
        headers: {
          Authorization: 'Bearer ' + session.token,
        },
      },
    )

    return 200
  }
  catch (e) {
    return e.response.status
  }
})
