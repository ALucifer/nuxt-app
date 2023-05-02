import AbstractClient from "~/app/client/DefaultClient";

export default class SearchClient extends AbstractClient {
    async user(username: string) {
        const { data } = await this.axiosInstance.post("users/search", { text: username });
        return data;
    }
}