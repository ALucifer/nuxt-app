export class ConversationSSE {
  constructor(user) {
    this.mercureUrl = new URL("http://localhost:1338/.well-known/mercure");
    this.user = user;
  }

  connect() {
    this.mercureUrl.searchParams.append(
      "topic",
      `user/${this.user.id}/newmessage`
    );
  }

  get eventSource() {
    return new EventSource(this.mercureUrl);
  }
}
