import {useMatchStore} from "~/store/match";
import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

export default async function useFetchMatchsByTournamentId() {
    const route = useRoute()
    const { setItems } = useMatchStore()

    const { data } = await useFetch<MatchWithTeamsAndScoresModel[]>(`/api/tournaments/${route.params.id}/matches`)

    setItems(data.value)
}