import { BaseApi } from "../../../shared/services/baseApi";
import type { TResponseHttp } from "../../../shared/types/responseType";
import type { TMenu } from "../types/menu.type";

class MenuApi extends BaseApi {

    constructor (){
        super("/menu")
    }

    async getMenu(): Promise<TResponseHttp<TMenu[]>>{
        return await this.http.get( this.getUrl() )
    }
    
}

export const menuApi = new MenuApi();