export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    await fetchSpotsApi('users/register', { method: 'POST', body })

    return 200
  }
  catch (e: Error) {
    return e.statusCode
  }
})
