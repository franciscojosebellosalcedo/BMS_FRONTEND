import { BaseApi } from "../../../../shared/services/baseApi";
import type { TPaginator } from "../../../../shared/types/paginatorType";
import type { TResponseHttp } from "../../../../shared/types/responseType";
import type { TDataRol, TRol } from "../types/rolType";

class RolApi extends BaseApi {

    constructor (){
        super("/rols")
    }

    async create( values: TDataRol ): Promise<TResponseHttp<TDataRol>>{
        return this.http.post( this.getUrl(), values);
    }

    async disable( id: number ): Promise<TResponseHttp<TRol>>{
        return this.http.put(this.getUrl() + `/disable/${id}`);
    }

    async enable( id: number ): Promise<TResponseHttp<TRol>>{
        return this.http.put(this.getUrl() + `/enable/${id}`);
    }

    async changeStatus( rol: TRol): Promise<TResponseHttp<TRol>>{
        return this.http.put( `${this.getUrl()}/${rol.rol_Activo ? "disable" : "enable"}/${rol.rol_Id}` )
    }

    async paginate( page: number, limit: number ): Promise<TResponseHttp<TPaginator>>{
        return this.http.post( this.getUrl()+ `/paginate?page=${page}&limit=${limit}`);
    }

}

const rolApi = new RolApi();
export default rolApi