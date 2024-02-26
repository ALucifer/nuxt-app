declare module 'next-auth' {
    interface User {
        id: number
        avatar: string
        pseudo: string
    }

    interface Token {
        value: string
    }

    interface Session {
        user: User,
        token: Token
    }
}