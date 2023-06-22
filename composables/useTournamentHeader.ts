import { find } from "lodash"
import { useAuthStore } from "~~/store/auth";
import useDate from "~/composables/useDate";
import {TournamentModel} from "~/app/models/tournament";

export default function useTournament() {
    const authStore = useAuthStore();
    const date = useDate()

    const user = computed(() => authStore.getUser);

    function isHalf(tournament: TournamentModel) {
        return (
            tournament.enroll >= tournament.max_teams / 2 &&
            tournament.state === "OPEN" &&
            tournament.image_bracket === null &&
            isOwner(tournament)
        )
    }

    function isOpen(tournament: TournamentModel)
    {
        return tournament.state === "OPEN" && tournament.challonge_id !== null && date.isAfterNow(tournament.begin_at)
    }

    function isOwner(tournament: TournamentModel) {
        return tournament.owner === user.value.id
    }

    function isRegister(tournament: TournamentModel) {
        return find(tournament.teams, (t) => t.user_id === user.value.id)
    }

    function userHasMatches(tournament: TournamentModel) {
        return find(tournament.matches, (m) => m.adversaire_a === user.value.id || m.adversaire_b === user.value.id)
    }

    function hasMatches(tournament: TournamentModel) {
        return tournament.matches?.length > 0
    }

    function isCompletlyClose (tournament: TournamentModel) {
        return tournament.state !== 'OPEN' || tournament.challonge_id === null || date.isBeforeNow(tournament.begin_at)
    }

    return {isHalf, isOwner, isRegister, userHasMatches, hasMatches, isCompletlyClose, isOpen }
}