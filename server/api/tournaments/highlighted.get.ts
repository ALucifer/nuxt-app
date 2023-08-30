import TournamentClient from "~/app/client/TournamentClient";
import {useTournamentStore} from "~/store/tournament";

export default defineEventHandler(async (event) => {
    const client = new TournamentClient()
    const { setHightlighted } = useTournamentStore()

    const data = await client.hightlighted()
    setHightlighted(data)

    return data
})