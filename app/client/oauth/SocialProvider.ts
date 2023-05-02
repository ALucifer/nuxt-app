import GoogleProvider from "~/app/client/oauth/providers/GoogleProvider";
import ProviderDTO from "~/app/client/oauth/DTO/ProviderDTO";
import ProviderInterface from "~/app/client/oauth/providers/Provider.Interface";

export default class SocialProvider {
    private readonly providers: ProviderInterface[]

    constructor() {
        this.providers = [new GoogleProvider()]
    }

    init(dto: ProviderDTO): any {
        for (let provider of this.providers) {
            if (provider.support(dto)) {
                return provider.init()
            }
        }
    }
}