import AbstractClient from "~/app/client/DefaultClient";

export default class UserClient extends AbstractClient {
    async register(form: { email: string, pseudo: string, password: string, password_confirmation: string}) {
        const { status } = await this.axiosInstance.post(
            "http://127.0.0.1:3333/users/register",
            form,
        )
        return status
    }

    async get(id: number) {
        const { data } = await this.axiosInstance.get("users/" + id)
        return data
    }

    async uploadAvatar(avatar: FormData) {
        const { data } = await this.axiosInstance.post(
            "me/avatar",
            avatar,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                },
            })
        return data
    }
}