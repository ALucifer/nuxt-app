import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const body = await readBody(event)

  try {
    await fetchSpotsApi(
      `/message/${body.id}/read`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + session.token,
        },
      },
    )
  }
  catch (e: Error) {
  }
})
