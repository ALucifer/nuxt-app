import type {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";

export default defineNuxtRouteMiddleware(async (to) => {
    const { getUser } = useSecurity()

    const { data } = await useFetch<MatchWithTeamsAndScoresModel>(`/api/matches/${to.params.id}`)
    const userLogged = getUser()

    if (!data.value) {
        throw createError({
          statusCode: 404
        })
    }

    if (
        ![
            data.value?.team_a.userId,
            data.value?.team_b.userId,
            data.value?.tournament.owner
            ].includes(userLogged.id) 
        ) {
        throw createError({ statusCode: 403, message: 'Vous ne pouvez pas accéder à cette page' })
    }

    to.meta.match = data.value
})