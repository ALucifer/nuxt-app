import { User, Token } from "next-auth";

export default function useSecurity() {
    const { data: auth, status: userLogged } = useAuth()

    function isLogged() {
        return userLogged.value === 'authenticated'
    }

    function getUser(): User {
        if (!auth.value) {
            throw Error('User not logged')
        }

        return auth.value.user
    }

    function getToken(): Token {
        if (!auth.value) {
            throw Error('User not logged')
        }

        return auth.value.token
    }

    function setAvatar(avatar: string) {
        if (!auth.value) {
            throw Error('User not logged')
        }

        auth.value.user.avatar = avatar
    }

    return { isLogged, getUser, getToken, setAvatar }
}