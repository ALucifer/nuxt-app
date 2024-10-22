import type { ConversationModel, NewConversationMessage } from '~/types/api/conversations'
import type { UserModel } from '~/app/models/user.model'

export function useNewConversation() {
  const route = useRoute()
  const isNewConversation = useState('isNewConversation', () => true)
  const newConversation = useState<NewConversationMessage>('newConversation')

  const handle = async (conversations: ConversationModel[]) => {
    if (!route.query['new-conversation-with-user']) {
      isNewConversation.value = false
      return
    }

    for (const conversation of conversations) {
      if ([conversation.sendFrom, conversation.sendTo].includes(+route.query['new-conversation-with-user'])) {
        isNewConversation.value = false
      }
    }

    if (isNewConversation.value === true) {
      try {
        const user = await $fetch<UserModel>(`/api/user/5`)

        newConversation.value = {
          id: 0,
          interlocutor: {
            pseudo: user.pseudo,
            avatar: user.avatar,
            id: user.id,
          },
        }
      }
      catch {
        isNewConversation.value = false
      }
    }
  }

  return { handle, isNewConversation, newConversation }
}
