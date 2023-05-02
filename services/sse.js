import useFlashMessages from "@/composables/useFlashMessages";
import ClientSSE from "~/app/client/sse/ClientSSE";

export class NotificationRegister {
  static registerToNewTeam(user) {
    const { addMessage } = useFlashMessages();
    const clientSSE = new ClientSSE(user)
    clientSSE.registerToNewTeam()

    clientSSE.eventSource.onmessage = ({ data }) => {
      const notification = JSON.parse(data);
      addMessage({
        message: notification.subject,
      });
    };
  }
}
