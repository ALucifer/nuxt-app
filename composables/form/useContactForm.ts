import { object, string } from "yup";
import type { ContactForm } from "~/app/form/contact.form";

export function useContactForm() {
    const { handleSubmit } = useForm<ContactForm>({
        validationSchema: object({
            email: string()
                .required("Email requis.")
                .email("Votre email n'est pas valide (exemple: john@doe.com)"),
            name: string().required("Pseudo requis."),
            message: string()
                .required("Veuillez entrer un message pour pouvoir l'envoyer.")
                .min(30, "Votre message doit contenir 30 charactères minimum."),
        })
    })

    return { handleSubmit }
}