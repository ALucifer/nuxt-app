import AbstractClient from "~/app/client/DefaultClient";

export default class MatchClient extends AbstractClient {
    async fetchById(id: number) {
        const { data } = await this.axiosInstance.get('matches/' + id)
        return data
    }
    async fetchUserMatches(tournament_id: number) {
        const { data } = await this.axiosInstance.get(
            `users/tournaments/${tournament_id}/matches`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )

        return data
    }
}