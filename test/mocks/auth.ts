export const MOCKED_USER = {
  user: {
    id: 0,
    avatar: 'avatar',
    pseudo: 'user-pseudo',
  },
}

export function useAuth() {
  return {
    data: ref(MOCKED_USER),
    status: ref('authenticated'),
    getSession: () => MOCKED_USER,
    signOut: () => {},
  }
}

export const getServerSession = () => MOCKED_USER
export const NuxtAuthHandler = () => eventHandler(() => MOCKED_USER)
