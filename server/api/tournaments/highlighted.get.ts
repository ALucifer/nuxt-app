import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async () => {
    try {
        const { data, status } = await axiosInstance.get('/tournaments/highlights')

        return data
    } catch (e) {
        // todo: voir pour gerer le cas d'erreur
        return []
    }
})