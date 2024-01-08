import axiosInstance from "~/app/client/axios";
import {getToken} from "#auth";

export default eventHandler(async (event) => {
    const session = await getToken({ event })
    if (!session) return

    try {
        const { data: conversations } = await axiosInstance.get('users/conversations', {
            headers: { Authorization: 'Bearer ' + session!.token}
        })

        return conversations
    } catch (e) {
        console.log(e)
    }
})