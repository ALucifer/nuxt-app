import {useTournamentStore} from "~/store/tournament";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    // const { setCurrentTournament } = useTournamentStore()

    const { data } = await instance.get(`tournaments/${id}`)
    // setCurrentTournament(data)

    return data
})