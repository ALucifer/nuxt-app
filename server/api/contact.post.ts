import { contactFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactFormSchema.parse)

  try {
    await fetchSpotsApi(
      'contact',
      {
        method: 'POST',
        body,
      },
    )
  }
  catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }
})
