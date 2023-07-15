import MatchClient from "~/app/client/MatchClient";
import {ScoreFormModel} from "~/app/models/scoreFormModel";
import { MatchWithTeamsAndScoresModel } from "~/app/models/match.model";

const matchClient = new MatchClient();
export const useMatchStore = defineStore({
    id: 'match',
    state: () => {
        return {
            item: {} as MatchWithTeamsAndScoresModel,
            userMatches: null
        }
    },
    actions: {
        setItem(item: any) {
            this.item = item
        },
        fetchMatch(item: any) {
            if (this.item && item.id === this.item.id) return

            return matchClient.fetchById(item.id).then((data: any) => {
                this.setItem(data)
                return data
            })
        },
        fetchUserMatches(tournament_id: number) {
          return matchClient.fetchUserMatches(tournament_id).then((data) => this.userMatches = data)
        },
        async saveScore(score: ScoreFormModel) {
            return matchClient.saveScore(score)
        }
    }
})