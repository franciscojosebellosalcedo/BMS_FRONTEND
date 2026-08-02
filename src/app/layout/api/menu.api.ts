import { BaseApi } from "../../../shared/services/baseApi";
import type { TResponseHttp } from "../../../shared/types/responseType";
import type { TMenu, TOption } from "../types/menu.type";

class MenuApi extends BaseApi {

    constructor (){
        super("/menu")
    }

    async getMenu(): Promise<TResponseHttp<TMenu[]>>{
        return await this.http.get( this.getUrl() );
    }

    async getOptions(): Promise<TResponseHttp<TOption[]>> {
        return await this.http.get( this.getUrl("/options") );
    }
    
}

export const menuApi = new MenuApi();