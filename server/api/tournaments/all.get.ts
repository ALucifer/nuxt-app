import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)

        const { data } = await axiosInstance.get('tournaments', { params: query })
        return data
    } catch (e) {
        console.log(e)
        return []
    }
})