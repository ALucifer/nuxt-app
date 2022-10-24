import useFlashMessages from "@/composables/useFlashMessages";

export class NotificationRegister {
  static registerToNewTeam(user) {
    const { addMessage } = useFlashMessages();
    const mercureUrl = new URL("http://localhost:1338/.well-known/mercure");
    mercureUrl.searchParams.append("topic", `user/${user.id}/notifications`);
    const eventSource = new EventSource(mercureUrl);
    eventSource.onmessage = ({ data }) => {
      const notification = JSON.parse(data);
      addMessage({
        message: notification.subject,
      });
    };
  }
}
