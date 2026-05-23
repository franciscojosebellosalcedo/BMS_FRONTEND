import { HttpClient } from "./httpClient"

export class BaseApi {

    protected http = HttpClient.getInstance();
    
    protected basePath: string

    constructor(basePath: string) {
        this.basePath = basePath
    }

    protected getUrl(path: string = "") {
        return `${this.basePath}${path}`
    }

}