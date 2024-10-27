import { forgotPasswordFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, forgotPasswordFormSchema.parse)

    await fetchSpotsApi('forgot-password', { method: 'POST', body })
  }
  catch {
    return createError({
      statusCode: 404,
      message: 'Email not found',
    })
  }
})
