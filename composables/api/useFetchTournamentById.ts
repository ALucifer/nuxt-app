import {useTournamentStore} from "~/store/tournament";

export default async function useFetchTournamentById() {
    const route = useRoute()
    const { setCurrentTournament } = useTournamentStore()

    const { data, pending } = await useFetch(`/api/tournaments/${route.params.id}`)

    setCurrentTournament(data.value)

    return { pending }
}