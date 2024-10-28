import { searchFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, searchFormSchema.parse)

  try {
    return await fetchSpotsApi('tournaments', { params: query })
  }
  catch (e) {
    console.log(e)
    return []
  }
})
