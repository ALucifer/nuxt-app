import { find } from "lodash"
import { useAuthStore } from "~~/store/auth";

export default function useTournamentHeader(useTournament) {
    const tournament = ref(useTournament)
    const authStore = useAuthStore();

    const user = computed(() => authStore.getUser);

    function isHalf() {
        return (
            tournament.value.enroll >= tournament.value.max_teams / 2 &&
            tournament.value.state === "OPEN" &&
            tournament.value.image_bracket === null &&
            isOwner()
        )
    }

    function isOwner() {
        return tournament.value.owner === user.value.id
    }

    function isRegister() {
        return find(tournament.value.teams, (t) => t.user_id === user.value.id)
    }

    function userHasMatches() {
        return find(tournament.value.matches, (m) => m.adversaire_a === user.value.id || m.adversaire_b === user.value.id)
    }

    return {isHalf, isOwner, isRegister, userHasMatches}
}