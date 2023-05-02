import AbstractClient from "~/app/client/DefaultClient";

export default class GoogleOauth extends AbstractClient {
    async token(token: String) {
        return await this.axiosInstance.get('/authentication/google', { params: { token: token }})
    }
}