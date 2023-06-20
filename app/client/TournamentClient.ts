import AbstractClient from "~/app/client/DefaultClient";
import {TournamentModel} from "~/app/models/tournament";

export default class TournamentClient extends AbstractClient {
    async all(params: any) {
        const { data } = await this.axiosInstance.get("tournaments", {
            params: params,
        })
        return data
    }

    async findById(id: number) {
        const { data } = await this.axiosInstance.get("tournaments/" + id)
        return data
    }

    async create(form: TournamentModel) {
        const { status } = await this.axiosInstance.post(
            "tournaments",
            form,
        )
        return status
    }

    async register(form: { libelle: string, avatar: string, tournament_id: number, user_id: number }) {
        const { status } = await this.axiosInstance.post(
            "tournaments/register",
            form,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )

        return status
    }

    async hightlighted(): Promise<TournamentModel[]> {
        const { data } = await this.axiosInstance.get('/tournaments/highlights')
        return data
    }

    async start(tournament: { id: number }) {
        await this.axiosInstance.get(
            "tournaments/" + tournament.id + "/start",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
    }

    async unsubscribe(tournament_id: number, user_id: number) {
        return await this.axiosInstance.post(
            "tournaments/" + tournament_id + "/unsubscribe/" + user_id,
            null,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
    }
}