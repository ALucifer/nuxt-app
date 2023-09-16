import { reactive } from "vue";
import { transformToLink } from "~/services/notification_transformer";
const messages: Array<FlashMessage> = reactive([]);

interface AddFlashMessage {
  message: string,
  class: 'success' | 'error' | 'warning'
}

interface FlashMessage extends AddFlashMessage{
  id: undefined|number,
}


const addMessage = (message: AddFlashMessage) => {
  const messageFormatted: string = transformToLink(message.message);
  messages.push({
    ...message,
    id: Math.random() + Date.now(),
    message: messageFormatted,
  });
};

const successMessage = (message: string) => {
  addMessage({
    class: 'success',
    message
  })
}

const errorMessage = (message: string) => {
  addMessage({
    class: 'error',
    message
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

const removeMessage = (id: number) => {
  const index = messages.findIndex((item) => item.id === id);
  messages.splice(index, 1);
};

export default function useFlashMessages() {
  return {
    messages,
    addMessage,
    removeMessage,
    successMessage,
    errorMessage,
    handleResponse
  };
}
