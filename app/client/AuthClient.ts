import AbstractClient from "~/app/client/DefaultClient";

interface OAuthForm {
    provider: string,
    email: string,
    providerId: string,
    avatar: string,
}

export default class AuthClient extends AbstractClient {
    async login(form: any) {
        try {
            const { data } = await this.axiosInstance.post('users/login', form)
            return data
        } catch (error) {
            return false
        }
    }
    async oauth(oauthForm: OAuthForm) {
        try {
            const { data } = await this.axiosInstance.post('/oauth/login', oauthForm)
            return data
        } catch (error) {
            console.log(error)
            return false
        }
    }

    forgotPassword(email: string) {
        try {
            this.axiosInstance.post('/forgot-password', {email})
         } catch (error) {
            console.log(error)
        }
    }

    async resetPassword(form: any) {
        try {
            const { status } = await this.axiosInstance.post('/reset-password', form)

            return status === 200
        } catch (error) {
            return false
        }
    }
}