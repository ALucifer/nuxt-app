import { getToken } from '#auth'
import type { StatusCode } from '~/types/api'
import { registerTournamentFormSchema } from '~/server/utils/schema'

export default defineEventHandler(async (event): Promise<StatusCode> => {
  const session = await getToken({ event })

  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You need to be register to perform this action.',
    })
  }

  const body = await readValidatedBody(event, registerTournamentFormSchema.parse)

  try {
    await fetchSpotsApi(
      'tournaments/register',
      {
        method: 'POST',
        body: {
          ...body,
          user_id: session.user.id,
        },
        headers: {
          Authorization: 'Bearer ' + session.token,
        },
      },
    )

    return 200
  }
  catch (e) {
    throw createError({
      statusCode: e.response.status,
      message: e.data.message,
      statusMessage: e.data.message,
    })
  }
})
