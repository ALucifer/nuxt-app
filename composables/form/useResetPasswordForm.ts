import {useForm} from "vee-validate";
import { object, string, ref } from "yup";
import type {ResetPasswordForm} from "~/app/form/reset-password.form";

export function useResetPasswordForm() {
    const { handleSubmit } = useForm<ResetPasswordForm>({
        validationSchema: object({
            password: string()
                .required("Mot de passe requis.")
                .min(6, "Votre mot de passe doit faire au mininum 6 charactères."),
            password_confirmation: string()
                .required("Confirmation de mot de passe requis.")
                .oneOf(
                    [ref("password")],
                    "Mot de passe et confirmation non identique"
                ),
        })
    })

    return { handleSubmit }
}