import { date, object, ref, string } from 'yup'
import * as yup from 'yup'

export const searchFormSchema = object({
  libelle: string(),
  format: string(),
  best_of: string(),
  date: date(),
  state: string(),
})

export const resetPasswordFormSchema = object({
  password: string()
    .required('Mot de passe requis.')
    .min(6, 'Votre mot de passe doit faire au mininum 6 charactères.'),
  password_confirmation: string()
    .required('Confirmation de mot de passe requis.')
    .oneOf(
      [ref('password')],
      'Mot de passe et confirmation non identique',
    ),
})

export const registerFormSchema = object({
  libelle: string().required('Le nom de votre équipe est obligatoire.'),
})

export const loginFormSchema = yup.object({
  email: yup.string().email('Invalid email format (ex: john.dev@gmail.com)').required('Email requis.'),
  password: yup.string().required('Mot de passe requis.'),
})

export const forgotPasswordFormSchema = object({
  email: string().required('Email requis.').email('Email non valide.'),
})

export const contactFormSchema = object({
  email: string()
    .required('Email requis.')
    .email('Votre email n\'est pas valide (exemple: john@doe.com)'),
  name: string().required('Pseudo requis.'),
  message: string()
    .required('Veuillez entrer un message pour pouvoir l\'envoyer.')
    .min(30, 'Votre message doit contenir 30 charactères minimum.'),
})
