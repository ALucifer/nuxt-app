import ProviderDTO from "~/app/client/oauth/DTO/ProviderDTO";
import ProviderInterface from "~/app/client/oauth/providers/Provider.Interface";
import GoogleOauth from "~/app/client/oauth/GoogleOauth";
import {AxiosResponse} from "axios";

export default class GoogleProvider implements ProviderInterface {
    init(): any {
        return google.accounts.oauth2.initTokenClient({
            client_id:
                "505909664046-ilo8mm7dfrq54c0c27fpqa5bui8frast.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/userinfo.email",
            callback: async (response: any) => {
                const { data } = await (new GoogleOauth()).token(response.access_token) as AxiosResponse
                console.log(data.token)
            },
        });
    }
    support(provider: ProviderDTO): boolean {
        return provider.equalTo('google')
    }

}