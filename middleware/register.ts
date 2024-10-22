import type { TournamentModel } from '~/app/models/tournament'

export default defineNuxtRouteMiddleware(async (to) => {
  const { isRegister, isCompletlyClose } = useTournament()
  const tournament = await $fetch<TournamentModel>('/api/tournaments/' + to.params.id)

  if (!tournament) {
    createError({
      statusCode: 404,
    })
  }

  if (!tournament.challongeId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to perform this action',
    })
  }

  if (isRegister(tournament) || isCompletlyClose(tournament)) {
    const { addMessage } = useFlashMessages()

    addMessage({
      class: 'success',
      message: 'pas possible',
    })

    return navigateTo({ name: 'tournois-id', params: { id: to.params.id } })
  }
})
