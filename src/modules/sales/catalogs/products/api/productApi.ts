import { BaseApi } from "../../../../../shared/services/baseApi";

class ProductApi extends BaseApi {

    constructor(){
        super("/products")
    }

    async create(){

    }
    
}

export const productApi = new ProductApi()