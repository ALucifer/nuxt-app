export default defineEventHandler(async () => {
  try {
    return await fetchSpotsApi('tournaments/highlights')
  }
  catch {
    return []
  }
})
