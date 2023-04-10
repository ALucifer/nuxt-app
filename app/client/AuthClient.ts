import AbstractClient from "~/app/client/DefaultClient";

export default class AuthClient extends AbstractClient {
    async login(form: any) {
        try {
            const { data } = await this.axiosInstance.post('users/login', form)
            localStorage.setItem('token', data.token.token)
            return data
        } catch (error) {
            return false
        }
    }
     async me() {
        try {
            const { data } = await this.axiosInstance.get(
                'me',
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            )
            return data
        } catch (error) {
            localStorage.removeItem('token')
        }
     }
}