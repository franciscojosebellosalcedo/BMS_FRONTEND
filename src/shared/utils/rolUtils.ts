import { store } from "../../app/store/store"

export const getNameRolCurrentUser = () =>{
    return store.getState().auth.rol?.rol_Nombre ?? ""
}