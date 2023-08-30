import axios from "axios";
import { ConversationModel } from "~/app/models/conversation.model";
import {useTestStore} from "~/store/test";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: { 'Content-Type': 'application/json' }
})
export default defineEventHandler(async (event) => {
    const { setConversations } = useTestStore()

    console.log('a')

    const { data } = await instance.get('users/conversations', {
        // headers: { Authorization: 'Bearer ' + session!.token}
        headers: { Authorization: 'Bearer Mw.ojFZkPfv0eWqM_mSS126SZACIzPGfhwmRT7Nnyy76WO1pNxmLwnXz9B9yhl9' }
    })

    console.log('b')

    console.log(data)

    setConversations(data)

    console.log('c')
    return {}
})