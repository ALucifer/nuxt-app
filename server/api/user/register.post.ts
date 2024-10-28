import { registerUserFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerUserFormSchema.parse)

  try {
    await fetchSpotsApi('users/register', { method: 'POST', body })

    return 200
  }
  catch (e) {
    return createError({
      statusCode: (e as { statusCode: number }).statusCode,
    })
  }
})
