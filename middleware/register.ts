import type { TournamentModel } from '~/app/models/tournament'

export default defineNuxtRouteMiddleware(async (to) => {
  const { isRegister, isCompletlyClose } = useTournament()
  const tournament = await $fetch<TournamentModel>('/api/tournaments/' + to.params.id)

  if (!tournament) {
    createError({
      statusCode: 404,
    })
  }

  if (isRegister(tournament) || isCompletlyClose(tournament) || !tournament.challongeId) {
    const { addMessage } = useFlashMessages()

    addMessage({
      class: 'success',
      message: 'pas possible'
    })

    return navigateTo({ name: 'tournois-id', params: { id: to.params.id } })
  }
})
