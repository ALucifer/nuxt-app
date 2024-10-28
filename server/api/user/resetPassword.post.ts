import { resetPasswordFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, resetPasswordFormSchema.parse)

    await fetchSpotsApi('reset-password', { method: 'POST', body })

    return true
  }
  catch {
    return false
  }
})
