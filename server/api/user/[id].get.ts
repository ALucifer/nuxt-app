export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    return await fetchSpotsApi(`/users/${id}`)
  }
  catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
