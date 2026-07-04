import { MENU_RESPONSE_CODES } from "./menu.errors.codes";

export const MENU_RESPONSE_MESSAGE : Record<string , string> =  {
    [MENU_RESPONSE_CODES.MENU_SUCCESS] : "Menu obtenido correctamente",
    [MENU_RESPONSE_CODES.MENU_ERROR]: "Error en obtener menu"
}