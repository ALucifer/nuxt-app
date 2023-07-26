import AbstractClient from "~/app/client/DefaultClient";

export default class AuthClient extends AbstractClient {
    async login(form: any) {
        try {
            const { data } = await this.axiosInstance.post('users/login', form)
            return data
        } catch (error) {
            return false
        }
    }
}