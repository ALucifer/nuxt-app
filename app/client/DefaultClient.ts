import axios from "axios";

export default abstract class AbstractClient {
    protected axiosInstance: any

    public constructor() {
        this.axiosInstance = axios.create({ baseURL: 'http://127.0.0.1:3333', headers: { 'Content-Type': 'application/json' } })
    }
}