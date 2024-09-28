import { object, string } from 'yup'
import type {RegisterForm} from "~/app/form/register.form";

export function useRegisterForm() {
    const { handleSubmit } = useForm<RegisterForm>({
        validationSchema:  object({
            libelle: string().required("Le nom de votre équipe est obligatoire."),
        })
    })

    return { handleSubmit }
}