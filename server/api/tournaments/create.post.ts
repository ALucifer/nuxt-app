import { getToken } from '#auth'
import { createTournamentFormSchema } from '~/utils/schema'

export default defineEventHandler(async (event) => {
  const session = await getToken({ event })
  if (!session) return

  const body = await readValidatedBody(event, createTournamentFormSchema.parse)

  try {
    return await fetchSpotsApi(
      'tournaments',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + session.token,
        },
        body,
      },
    )
  }
  catch {
    throw createError({
      statusCode: 400,
      message: 'Une erreur est survenu lors de la création de votre tournoi',
    })
  }
})
