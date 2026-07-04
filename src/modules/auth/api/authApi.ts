import { BaseApi } from "../../../shared/services/baseApi";

import type {
    TResponseHttp
} from "../../../shared/types/responseType";

import type {
    TLogin,
    TLoginResponse
} from "../types/authType";

class AuthApi extends BaseApi {

    constructor() {
        super("/auth");
    }

    login(
        values: TLogin
    ): Promise<
        TResponseHttp<
            TLoginResponse
        >
    > {

        return this.http.post(
            this.getUrl(
                "/login"
            ),
            values
        );

    }

    logout(
        idUser: number
    ): Promise<
        TResponseHttp<void>
    > {

        return this.http.put(
            this.getUrl(
                `/logout/${idUser}`
            )
        );

    }

    refreshSession(
        refressToken: string
    ): Promise<
        TResponseHttp<
            TLoginResponse
        >
    > {

        return this.http.post(
            this.getUrl(
                "/refress"
            ),
            {
                refressToken
            }
        );

    }

}

export const authApi =
    new AuthApi();