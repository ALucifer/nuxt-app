import { getToken } from '#auth'

export default eventHandler(async (event) => {
  try {
    const session = await getToken({ event })
    if (!session) return

    return await fetchSpotsApi(
      'users/conversations',
      {
        headers: { Authorization: 'Bearer ' + session!.token },
      },
    )
  }
  catch {
    return []
  }
})
