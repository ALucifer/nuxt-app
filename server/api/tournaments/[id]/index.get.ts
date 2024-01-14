import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const { data } = await axiosInstance.get(`tournaments/${id}`)

    return data
})