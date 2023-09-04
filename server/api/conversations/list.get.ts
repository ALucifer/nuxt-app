import axios from "axios";
import {getServerSession} from "#auth";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)

    const { data: conversations } = await instance.get('users/conversations', {
        headers: { Authorization: 'Bearer ' + session!.token}
    })

    return { conversations }
})