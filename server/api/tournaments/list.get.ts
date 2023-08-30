import axios from "axios";
import {useTournamentStore} from "~/store/tournament";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})

export default defineEventHandler(async (event) => {
    const { setItems, setTotal } = useTournamentStore()
    const { data } = await instance.get('tournaments')

    setTotal(data.meta.total)
    setItems(data.data)

    return {}
})