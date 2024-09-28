import { object, string } from "yup";
import type {ForgotPasswordForm} from "~/app/form/forgot-password.form";

export function useForgotPasswordForm() {
    const { handleSubmit } = useForm<ForgotPasswordForm>({
        validationSchema: object({
            email: string().required('Email requis.').email('Email non valide.')
        })
    })

    return { handleSubmit }
}