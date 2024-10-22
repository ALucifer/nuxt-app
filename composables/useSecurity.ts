import type { User, Token } from 'next-auth'

export const useSecurity = () => {
  const { data: auth, status: userLogged } = useAuth()

  const isLogged = () => {
    return userLogged.value === 'authenticated'
  }

  const getUser = (): User => {
    if (!auth.value) {
      throw Error('User not logged')
    }

    return auth.value.user
  }

  const getToken = (): Token => {
    if (!auth.value) {
      throw Error('User not logged')
    }

    return auth.value.token
  }

  return { isLogged, getUser, getToken }
}
