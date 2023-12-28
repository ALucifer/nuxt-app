import axios from "axios";
import {getServerSession} from "#auth";
import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";
import useFlashMessages from "~/composables/useFlashMessages";
import useTest from "~/composables/useTest";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})
export default defineEventHandler(async (event): Promise<MatchWithTeamsAndScoresModel[]> => {
    const id = getRouterParam(event, 'id')

    try {
        const { data } = await instance.get<MatchWithTeamsAndScoresModel[]>(`tournaments/${id}/matches`)

        return data
    } catch (e) {
        return []
    }
})