export default function useSecurity() {
    const { data: auth, status: userLogged } = useAuth()

    function isLogged() {
        return userLogged.value === 'authenticated'
    }

    function getUser(): any {
        if (!auth.value) {
            throw Error('User not logged')
        }

        return auth.value.user
    }

    function getToken(): any {
        if (!auth.value) {
            throw Error('User not logged')
        }

        return auth.value.token
    }

    return { isLogged, getUser, getToken }
}