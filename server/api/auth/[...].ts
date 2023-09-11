import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import AuthClient from "~/app/client/AuthClient";
import Google from "next-auth/providers/google";


// @ts-ignore
// @ts-ignore
export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'your-secret-here',
    debug: false,
    pages: {
        signIn: '/login',
    },
    providers: [
        Google.default({
            clientId: '505909664046-ilo8mm7dfrq54c0c27fpqa5bui8frast.apps.googleusercontent.com',
            clientSecret: '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',
        }),
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
                    return false
                }
            }
        })
    ],
    callbacks: {
        // @ts-ignore
        signIn: async ({user, account }) => {
            try {
                if (account.provider === 'credentials') {
                    return true
                }

                const client = new AuthClient()
                const data = await client.oauth({
                    provider: account.provider,
                    email: user.email,
                    providerId: account.providerAccountId,
                    avatar: user.image
                })

                user.id = data.user.id

                return data
            } catch(error: any) {
                return false
            }
        },
        // @ts-ignore
        jwt: async ({ token, user, account }) => {
            const isSignIn = user ? true : false;

            if (account?.provider === 'google') {
                token.user = {
                    avatar: user.image,
                    username: user.email,
                    pseudo: user.email,
                    id: user.id,
                    email: user.email
                }
                token.token = account.access_token
            } else {

                if (isSignIn) {
                    token.user = user.user
                    token.token = user.token
                }
            }

            return Promise.resolve(token);
        },
        // @ts-ignore
        session: async ({ session, token }) => {
            session.user = token.user
            session.token = token.token

            return Promise.resolve(session);
        },
    },
})
