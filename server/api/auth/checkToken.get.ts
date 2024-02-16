import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const query = getQuery(event)

    try {
        await axiosInstance.get('/me/check', { headers: { Authorization: "Bearer " + query.token } })
        return true
    } catch (e) {
        return false
    }
})