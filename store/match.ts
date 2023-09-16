import MatchClient from "~/app/client/MatchClient";
import {ScoreFormModel} from "~/app/models/scoreFormModel";
import {MatchModel, MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

const matchClient = new MatchClient();
export const useMatchStore = defineStore({
    id: 'match',
    state: () => {
        return {
            items: [] as MatchWithTeamsAndScoresModel[],
            item: {} as MatchWithTeamsAndScoresModel,
            userMatches: [] as MatchModel[] // a transformer en actions
        }
    },
    actions: {
        setItem(item: any) {
            this.item = item
        },
        setItems(items: MatchWithTeamsAndScoresModel[]) {
            this.items = items
        },
        fetchMatch(item: any) {
            if (this.item && item.id === this.item.id) return

            return matchClient.fetchById(item.id).then((data: any) => {
                this.setItem(data)
                return data
            })
        },
        async saveScore(score: ScoreFormModel) {
            const { status, match } = await matchClient.saveScore(score)

            const index = this.userMatches.findIndex((item: any) => item.id === match.id)

            this.userMatches[index] = match

            return status
        }
    }
})