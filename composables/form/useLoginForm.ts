import * as yup from "yup";
import type { LoginForm } from "~/app/form/login.form";

export function useLoginForm() {
    const { handleSubmit } = useForm<LoginForm>({
        validationSchema: yup.object({
            email: yup.string().email('Invalid email format (ex: john.dev@gmail.com)').required("Email requis."),
            password: yup.string().required("Mot de passe requis."),
        })
    })

    return { handleSubmit }
}