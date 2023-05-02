import ProviderDTO from "~/app/client/oauth/DTO/ProviderDTO";

export default interface ProviderInterface {
    support(provider: ProviderDTO): boolean;
    init(): any;
}
