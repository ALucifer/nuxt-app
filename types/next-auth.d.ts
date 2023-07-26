declare module 'next-auth' {
    interface User {
        id: number
    }

    interface Token {
        value: string
    }

    interface Session {
        user: User,
        token: Token
    }
}