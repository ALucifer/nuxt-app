export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!to.query.user || import.meta.client) return

    const { status, data: user } = await useFetch(`/api/user/${from.query.user}`, { key: Math.random().toString() })
    const { getUser } = useSecurity()

    if (from.query.user == getUser().id) {
        return navigateTo('/profile/messages')
    }

    if (status.value === 'error') {
        return navigateTo(to.path)
    }

    to.meta.user = user.value
})