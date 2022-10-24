import { reactive } from "vue";
import { transformToLink } from "@/services/notification_transformer";
const messages = reactive([]);

const addMessage = (message) => {
  message = transformToLink(message.message);
  messages.push({
    id: Math.random() + Date.now(),
    ...message,
    message: message,
  });
};

const removeMessage = (id) => {
  const index = messages.findIndex((item) => item.id === id);
  messages.splice(index, 1);
};

export default function useFlashMessages() {
  return {
    messages,
    addMessage,
    removeMessage,
  };
}
