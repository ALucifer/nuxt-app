import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    const query = getQuery(event)

    try {
        const { data } = await axiosInstance.get('/me/check', { headers: { Authorization: "Bearer " + query.token } })
        return data
    } catch (e) {
        return false
    }
})