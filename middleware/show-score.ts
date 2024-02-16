import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getUser } = useSecurity()

    const { data, status } = await useFetch<MatchWithTeamsAndScoresModel>(`/api/matches/${to.params.id}`)
    const userLogged = getUser()

    if (status.value === 'error' || data.value.team_a.user_id !== userLogged.id && data.value.team_b.user_id !== userLogged.id) {
        throw createError({ statusCode: 403, message: 'Vous ne pouvez pas accéder à cette page' })
    }

    to.meta.match = data.value
})