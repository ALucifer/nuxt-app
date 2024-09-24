import { transformToLink } from "~/services/notification_transformer";

interface AddFlashMessage {
  message: string,
  class: 'success' | 'error' | 'warning'
}

interface FlashMessage extends AddFlashMessage{
  id: number,
  visible: boolean,
}

export default function useFlashMessages() {
  const messages = useState<FlashMessage[]>('flash-messages', () => [])

  function addMessage(message: AddFlashMessage) {
    // const messageFormatted: string = transformToLink(message.message);

    const flashMessage = {
      ...message,
      id: Math.random() + Date.now(),
      message: message.message,
      visible: true
    }

    messages.value.push(flashMessage);

    setTimeout(() => {
      messages.value.at(-1).visible = false
    }, 5000)
  }

  function removeMessage(id: number) {
      const index = messages.value.findIndex((item) => item.id === id);
      messages.value.splice(index, 1);
  }

  function successMessage(message: string) {
      addMessage({
        class: 'success',
        message
      })
  }

  function errorMessage(message: string) {
      addMessage({
        class: 'error',
        message
      })
  }

  function handleResponse(status: boolean, success: string, error: string) {
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

  return {
    messages,
    addMessage,
    removeMessage,
    successMessage,
    errorMessage,
    handleResponse
  };
}
