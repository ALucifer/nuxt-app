import {useTournamentStore} from "~/store/tournament";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { fetchTournament } = useTournamentStore()
    const { isRegister, isCompletlyClose } = useTournament()
    const tournament = await fetchTournament(+to.params.id)

    if (isRegister(tournament) || isCompletlyClose(tournament)) {
        return navigateTo({ name: 'tournois-id', params: { id: to.params.id } })
    }
})