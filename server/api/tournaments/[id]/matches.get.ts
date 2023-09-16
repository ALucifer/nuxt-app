import axios from "axios";
import {getServerSession} from "#auth";
import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})
export default defineEventHandler(async (event): Promise<MatchWithTeamsAndScoresModel[] | null> => {
    const id = getRouterParam(event, 'id')
    const session = await getServerSession(event)

    try {
        const { data } = await instance.get<MatchWithTeamsAndScoresModel[]>(`tournaments/${id}/matches`, {
            headers: { Authorization: 'Bearer ' + session!.token}
        })

        return data
    } catch (e) {
        return null
    }
})