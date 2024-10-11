export default class ClientSSE {
  private readonly mercureUrl: URL
  private user_id: number
  private eventSourceInstance: EventSource | null = null

  constructor(user_id: number) {
    this.mercureUrl = new URL('http://localhost:1338/.well-known/mercure')
    this.user_id = user_id
  }

  connect() {
    this.mercureUrl.searchParams.append(
      'topic',
      `user/${this.user_id}/newmessage`,
    )
  }

  registerToNewTeam() {
    this.mercureUrl.searchParams.append(
      'topic',
      `user/${this.user_id}/notifications`,
    )
  }

  get eventSource(): EventSource {
    if (this.eventSourceInstance) {
      return this.eventSourceInstance as EventSource
    }

    this.eventSourceInstance = new EventSource(this.mercureUrl)

    return this.eventSourceInstance
  }
}
