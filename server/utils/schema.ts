import { z } from 'zod'

const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

export {
  createTournamentFormSchema,
  contactFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
  registerUserFormSchema,
  resetPasswordFormSchema,
} from '~/utils/schema'

export const registerTournamentFormSchema = z.object({
  libelle: z.string({ message: 'Name is required.' }),
  avatar: z.string({ message: 'Avatar is required.' }),
  tournament_id: z.number({ message: 'Tournament id is required.' }),
})

export const sendMessageFormSchema = z.object({
  text: z.string({ message: 'Text required.' }),
  sendTo: z.number({ message: 'Receiver is required. ' }),
  conversation_id: z.number({ message: 'Conversation id is required.' }),
})

export const searchFormSchema = z.object({
  page: z.string({ message: 'Page must be a string type' }).optional(),
  libelle: z.string({ message: 'Libelle must be a string type.' }).optional(),
  format: z.string({ message: 'Format must be a string type.' }).optional(),
  best_of: z.number({ message: 'Best of must be a number type.' }).optional(),
  date: z.string().optional().refine(
    (date) => {
      return !date || dateRegex.test(date)
    },
    {
      message: 'Date should have format: \'YYYY-DD-MM HH:mm:ss\'',
    },
  ),
  state: z.string({ message: 'State is required.' }).optional(),
})
