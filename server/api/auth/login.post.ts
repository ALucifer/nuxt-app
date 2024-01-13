import axiosInstance from "~/app/client/axios";

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        const { data } = await axiosInstance.post('users/login', body)
        return data
    } catch (e) {
        console.log('Login ou mot de passe incorrect')

    }
})