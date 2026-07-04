import { store } from "../../app/store/store";
import { TEXT_REFRESS_TOKEN } from "../../constants/authConstant";
import { login, logout } from "../../features/auth/authSlice";
import { getItemLocalStorage, setItemLocalStorage } from "../../shared/utils/localStorageUtils";
import { authApi } from "./api/authApi";
import type { TLoginResponse } from "./types/authType";

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