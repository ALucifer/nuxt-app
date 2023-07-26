import { User, Token } from "next-auth";

export default function useSecurity() {
    const { status, data } = useAuth()
    function isLogged() {
        return status.value === 'authenticated'
    }

    function getUser(): User {
        if (!data.value) {
            throw Error('Pas co')
        }

        return data.value.user
    }

    function getToken(): Token {
        if (!data.value) {
            throw Error('User not logged')
        }

        return data.value.token
    }

    return { isLogged, getUser, getToken }
}