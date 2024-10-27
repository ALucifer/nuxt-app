import { z } from 'zod'
import dayjs from 'dayjs'

const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

export const contactFormSchema = z.object({
  email: z.string({ message: 'Email is required.' }).email({ message: 'Email invalid.' }),
  name: z.string({ message: 'Name is required.' }),
  message: z.string({ message: 'Message is required.' }).min(30, 'Your message must contain 30 characters'),
})

export const registerTournamentFormSchema = z.object({
  libelle: z.string({ message: 'Name is required.' }),
})

export const searchFormSchema = z.object({
  libelle: z.string({ message: 'Libelle is required.' }).optional(),
  format: z.string({ message: 'Format is required.' }).optional(),
  best_of: z.number({ message: 'Best of is required.' }).optional(),
  date: z.string().optional().refine(
    (date) => {
      return !date || dateRegex.test(date)
    },
    {
      message: 'La date doit être au format \'YYYY-DD-MM HH:mm:ss\'',
    },
  ),
  state: z.string({ message: 'State is required.' }).optional(),
}).refine((data) => {
  return data.libelle || data.format || data.best_of || data.date || data.state
}, {
  message: 'You must fill in at least one field',
})

export const resetPasswordFormSchema = z.object({
  password: z.string({ message: 'Password required.' }).min(6, 'Password must be greater than 6.'),
  password_confirmation: z.string({ message: 'Password confirmation is required.' }),
}).refine(
  data => data.password === data.password_confirmation,
  { message: 'Passwords do not match.', path: ['password_confirmation'] },
)

export const loginFormSchema = z.object({
  email: z.string({ message: 'Email required.' }).email('Invalid email format (ex: john.dev@gmail.com).'),
  password: z.string({ message: 'Password required.' }),
})

export const forgotPasswordFormSchema = z.object({
  email: z.string({ message: 'Email is required.' }).email('Invalid email format.'),
})

export const sendMessageFormSchema = z.object({
  message: z.string({ message: 'Message required.' }),
})

export const registerUserFormSchema = z.object({
  email: z.string({ message: 'Email is required.' }).email('Invalid email format (ex: john.dev@gmail.com).'),
  pseudo: z.string({ message: 'Pseudo is required.' }).min(2, 'Pseudo must be greater than 2.'),
  password: z.string({ message: 'Password required.' }).min(6, 'Password must be greater than 6.'),
  password_confirmation: z.string({ message: 'Password confirmation is required.' }),
}).refine(
  data => data.password === data.password_confirmation,
  { message: 'Passwords do not match.', path: ['password_confirmation'] },
)

export const createTournamentStepOneFormSchema = z.object({
  libelle: z.string({ message: 'Libelle is required.' }).nonempty('Ko'),
  beginAt: z.string().refine(
    (date) => {
      const now = Date.now()
      const chosenDate = dayjs(date).valueOf()

      return dateRegex.test(date) && chosenDate > now
    },
    {
      message: 'La date doit être au format \'YYYY-MM-DD HH:mm:ss\'',
    },
  ),
})

export const createTournamentStepTwoFormSchema = z.object({
  format: z.string({ message: 'Format is required.' }),
  maxTeams: z.number({ message: 'Max Teams is required.' }),
  skillLevel: z.string(),
  bestOf: z.number(),
})

export const createTournamentStepThreeFormSchema = z.object({
  speech: z.string({ message: 'Speech is required.' }),
  progress: z.string({ message: 'Description is required.' }).min(30, 'Your description si too short'),
})

export const createTournamentFormSchema = z.object({
  libelle: z.string({ message: 'Libelle is required.' }).nonempty('Ko'),
  beginAt: z.string().refine(
    (date) => {
      const now = Date.now()
      const chosenDate = dayjs(date).valueOf()

      return dateRegex.test(date) && chosenDate > now
    },
    {
      message: 'La date doit être au format \'YYYY-MM-DD HH:mm:ss\'',
    },
  ),
  format: z.string({ message: 'Format is required.' }),
  maxTeams: z.number({ message: 'Max Teams is required.' }),
  skillLevel: z.string({ message: 'SkillLevel is required.' }),
  bestOf: z.number({ message: 'BestOf is required.' }),
  speech: z.string({ message: 'Speech is required.' }),
  progress: z.string({ message: 'Description is required.' }).min(30, 'Your description si too short'),
  owner: z.number({ message: 'Owner is required.' }),
})
