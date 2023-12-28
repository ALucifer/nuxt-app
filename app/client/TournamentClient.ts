import AbstractClient from "~/app/client/DefaultClient";
import {TournamentModel} from "~/app/models/tournament";

export default class TournamentClient extends AbstractClient {
    async all(params: any = null) {
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
        const { getToken } = useSecurity()
        try {
            const { data } = await this.axiosInstance.post(
                "tournaments",
                form,
                { headers: { Authorization: 'Bearer ' + getToken() }}
            )

            return data
        } catch (error) {
            return null
        }
    }

    async register(form: { libelle: string, avatar: string, tournament_id: number, user_id: number }) {
        const { data: auth } = useAuth()
        return this.axiosInstance.post(
            "tournaments/register",
            form,
            { headers: { Authorization: "Bearer " + auth.value.token } }
        ).catch(error => error.response.status)
    }

    async hightlighted(): Promise<TournamentModel[]> {
        const { data } = await this.axiosInstance.get('/tournaments/highlights')
        return data
    }

    async start(tournament: { id: number }) {
        const { getToken } = useSecurity()
        try {
            await this.axiosInstance.post(
                "tournaments/" + tournament.id + "/start",
                {},
                { headers: { Authorization: "Bearer " + getToken() } }
            )

            return true
        } catch (e) {
            return false
        }
    }

    async unsubscribe(tournament_id: number) {
        const { getToken } = useSecurity()
        try {
            await this.axiosInstance.post(
                "/tournaments/" + tournament_id + "/unsubscribe",
                {},
                { headers: { Authorization: "Bearer " + getToken() } }
            )
            return { status : true }
        } catch (e) {
            return { status: false }
        }
    }
}