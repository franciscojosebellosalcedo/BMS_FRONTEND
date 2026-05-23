import { store } from "../../app/store/store";

export const getNamesUser = () => {

    const currentUser = store.getState().auth.user;

    if (currentUser ) {

        const partsNameUser = currentUser?.usua_Nombre.split(" ");
        const firtLetter = partsNameUser[0] ? partsNameUser[0][0] : ""
        const secondLetter = partsNameUser[1] ? partsNameUser[1][0] : ""

        return {
            shortName: `${firtLetter}${secondLetter}`.toUpperCase(),
            name: currentUser.usua_Nombre,
            nameUser: currentUser.usua_NombreUsuario
        }

    }

    return {
        shortName: "",
        name: "",
        nameUser: ""
    };
}