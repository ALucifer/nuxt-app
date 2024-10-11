export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    return fetchSpotsApi(
      '/oauh/login',
      {
        method: 'POST',
        body: { ...body.form },
      },
    )
  }
  catch {
    return false
  }
})
