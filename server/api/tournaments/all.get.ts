import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async (event) => {
    try {
        const { data } = await axiosInstance.get('tournaments')
        return data
    } catch (e) {
        return []
    }
})