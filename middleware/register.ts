import {useTournamentStore} from "~/store/tournament";
import type {TournamentModel} from "~/app/models/tournament";

export default defineNuxtRouteMiddleware(async (to) => {
    const { fetchTournament } = useTournamentStore()
    const { isRegister, isCompletlyClose } = useTournament()
    const tournament: TournamentModel = await fetchTournament(+to.params.id)

    if (isRegister(tournament) || isCompletlyClose(tournament) || !tournament.challongeId) {
        return navigateTo({ name: 'tournois-id', params: { id: to.params.id } })
    }
})