import { loginFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginFormSchema.parse)

  try {
    return await fetchSpotsApi(
      'users/login',
      {
        method: 'POST',
        body,
      },
    )
  }
  catch {
    throw createError({ statusCode: 404, message: 'user not found' })
  }
})
