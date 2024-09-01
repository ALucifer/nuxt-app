import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import Google from "next-auth/providers/google";

async function verifyToken(token: any) {
    return await $fetch('/api/auth/checkToken', { query: { token: token }})
}

// @ts-ignore
export default NuxtAuthHandler({
    secret: 'gargragroajg',
    auth: {
        provider: {
            type: 'authjs',
        },
    },
    debug: false,
    pages: {
        signIn: '/login',
    },
    providers: [
        Google.default({
            clientId: '',
            clientSecret: '',
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
                    const data = await $fetch(
                        '/api/auth/login',
                        {
                            method: 'POST',
                            body: { email: credentials.email, password: credentials.password }
                        }
                    )
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
        // @ts-ignore
        signIn: async ({ user, account }) => {
            try {
                if (account.provider === 'credentials') {
                    return true
                }

                const data = await $fetch(
                    '/api/auth/social',
                    {
                        method: 'POST',
                        body: {
                            form: {
                                provider: account.provider,
                                email: user.email,
                                providerId: account.providerAccountId,
                                avatar: user.image
                            }
                        }
                    }
                )

                user.id = data.user.id

                account.token = data.token

                return data
            } catch(error: any) {
                return false
            }
        },
        // @ts-ignore
        jwt: async ({ account, token, user }) => {
            const isSignIn = !!user;
            if (account?.provider === 'google') {
                token.user = {
                    avatar: user.image,
                    username: user.email,
                    pseudo: user.email,
                    id: user.id,
                    email: user.email
                }

                token.token = account.token.token
            } else {
                if (isSignIn) {
                    token.user = user.user
                    token.token = user.token
                }
            }

            const tokenValid = await verifyToken(token.token)

            if (!tokenValid) {
                return Promise.reject('Invalid token')
            }

            // token.user = tokenValid.user

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
