import type { FlashMessage, AddFlashMessage, CssClassFlashMessage } from '~/types/notifications'

export const useFlashMessages = () => {
  const messages = useState<FlashMessage[]>('notification', () => [])
  const messagesInCookie = useCookie<FlashMessage[]>('notifications', {
    default: () => [],
    maxAge: 5,
  })

  const addMessage = (message: AddFlashMessage) => {
    const flashMessage = {
      ...message,
      id: Math.random() + Date.now(),
      message: message.message,
      visible: true,
    }

    messages.value.push(flashMessage)
    messagesInCookie.value.push(flashMessage)

    setTimeout(() => {
      // @ts-expect-error messages cannot be empty due to messages.values.push in line 24
      messages.value.at(-1).visible = false
    }, 5000)
  }

  const removeMessage = (id: number) => {
    const index = messages.value.findIndex(item => item.id === id)
    messages.value.splice(index, 1)
  }

  const successMessage = (message: string) => {
    addMessage({
      class: 'success',
      message,
    })
  }

  const errorMessage = (message: string) => {
    addMessage({
      class: 'error' as CssClassFlashMessage,
      message,
    })
  }

  const handleResponse = (status: boolean, success: string, error: string) => {
    switch (status) {
      case true: {
        successMessage(success)
        break
      }
      case false: {
        errorMessage(error)
        break
      }
      default: {
        break
      }
    }
  }

  const readMessagesCookie = () => {
    if (messagesInCookie.value.length > 0) {
      messages.value = messagesInCookie.value
    }
  }

  return {
    messages,
    addMessage,
    removeMessage,
    successMessage,
    errorMessage,
    handleResponse,
    readMessagesCookie,
  }
}
