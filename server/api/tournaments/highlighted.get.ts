import TournamentClient from "~/app/client/TournamentClient";

export default defineEventHandler(async (event) => {
    const client = new TournamentClient()

    return await client.hightlighted()
})