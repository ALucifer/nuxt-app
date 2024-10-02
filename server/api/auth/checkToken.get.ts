export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    return await fetchSpotsApi(
      '/me/check',
      {
        headers: { Authorization: 'Bearer ' + query.token } },
    )
  }
  catch {
    throw createError({
      statusCode: 404,
      message: 'An error has occured on token verification',
    })
  }
})
