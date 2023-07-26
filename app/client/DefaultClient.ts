import axios, {AxiosInstance} from "axios";
import {ScoreFormModel} from "~/app/models/scoreFormModel";

export default abstract class AbstractClient {
    protected axiosInstance: AxiosInstance

    public constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:3333',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public async saveScore(score: ScoreFormModel) {
        const { getToken } = useSecurity()

        return await this.axiosInstance.post(
            '/scores',
            score,
            { headers: { Authorization: "Bearer " + getToken() } }
        )
    }
}