import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    const conversationId = getRouterParam(event, 'id')
    const query = getQuery(event)

    if (!session || !conversationId) return

    return await fetchSpotsApi(
      'users/conversations/' + conversationId,
      {
        headers: { Authorization: 'Bearer ' + session!.token },
        query: {
          page: query.page ?? 1,
        },
      },
    )
  }
  catch {
    return []
  }
})
