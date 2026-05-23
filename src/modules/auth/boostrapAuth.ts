import { store } from "../../app/store/store";
import { TEXT_REFRESS_TOKEN } from "../../constants/auth-constant";
import { login, logout } from "../../features/auth/auth-slice";
import { getItemLocalStorage, setItemLocalStorage } from "../../shared/utils/localStorage-utils";
import { authApi } from "./authApi";
import type { TLoginResponse } from "./types";

export const boostrapAuth = async () =>{

    const refressToken = getItemLocalStorage( TEXT_REFRESS_TOKEN );
    
    if(!refressToken){

        store.dispatch(
            logout()
        );

        return;

    }

    try {

        const responseHttp = await authApi.refreshSession( refressToken );
        if( responseHttp.statusCode === 200 && responseHttp.ok ){

            const dataResponse: TLoginResponse = responseHttp.data;
            
            store.dispatch(
                login(dataResponse)
            );
    
            setItemLocalStorage(TEXT_REFRESS_TOKEN, dataResponse.refressToken );

        }
        
    } catch (error: any ) {
        
        store.dispatch(
            logout()
        )

    }

}