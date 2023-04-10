
export default class ClientSSE {
    private readonly mercureUrl: URL;
    private user: any
    private eventSourceInstance: EventSource|null = null

    constructor(user: { id: number }) {
        this.mercureUrl = new URL('http://localhost:1338/.well-known/mercure')
        this.user = user
    }

    connect()
    {
        this.mercureUrl.searchParams.append(
            'topic',
            `user/${this.user.id}/newmessage`
        )
    }

    registerToNewTeam()
    {
        this.mercureUrl.searchParams.append(
            'topic',
            `user/${this.user.id}/notifications`
        )
    }

    get eventSource(): EventSource
    {
        if (this.eventSourceInstance) {
            return this.eventSourceInstance as EventSource
        }

        this.eventSourceInstance = new EventSource(this.mercureUrl)

        return this.eventSourceInstance
    }
}