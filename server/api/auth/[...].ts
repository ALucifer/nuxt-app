import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import AuthClient from "~/app/client/AuthClient";

export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'your-secret-here',
    debug: true,
    pages: {
        signIn: '/login',
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text', placeholder: '(hint: jsmith)'},
                password: {label: 'Password', type: 'password', placeholder: '(hint: hunter2)'}
            },
            async authorize(credentials: any) {
                try {
                    const client = new AuthClient()
                    const data = await client.login({ email: credentials.email, password: credentials.password})

                    return {
                        user: {
                            avatar: data.avatar,
                            email: data.email,
                            username: data.username,
                            pseudo: data.pseudo,
                            id: data.id
                        },
                        token: data.token.token
                    }
                } catch (e: any) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            const isSignIn = user ? true : false;

            if (isSignIn) {
                token.user = user.user
                token.token = user.token
            }
            return Promise.resolve(token);
        },
        session: async ({session, token}) => {
            (session as any).user = token.user;
            (session as any).token = token.token;
            return Promise.resolve(session);
        },
    }
})
