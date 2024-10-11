import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const body = await readBody(event)

  try {
    return await fetchSpotsApi(
      'conversation',
      {
        method: 'POST',
        body: body.form,
        headers: { Authorization: 'Bearer ' + session.token },
      },
    )
  }
  catch (e) {
  }
})
