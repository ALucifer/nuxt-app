import AbstractClient from "~/app/client/DefaultClient";

export default class ContactClient extends AbstractClient{
    async post(form: { email: string, name: string, message: string }) {
        const { status } = await this.axiosInstance.post(
            "contact",
            form,
        )
        return status
    }
}