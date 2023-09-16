import AbstractClient from "~/app/client/DefaultClient";
import {ScoreFormModel} from "~/app/models/scoreFormModel";

export default class MatchClient extends AbstractClient {
    async fetchById(id: number) {
        const { data } = await this.axiosInstance.get('matches/' + id)
        return data
    }

    async saveScore(score: ScoreFormModel) {
        const { getToken } = useSecurity()
        try {
            const { data: updatedMatch } = await this.axiosInstance.post(
                '/scores',
                score,
                { headers: { Authorization: "Bearer " + getToken() } }
            )

            return { status: true, match: updatedMatch }
        } catch (error) {
            return { status: false }
        }

    }
}