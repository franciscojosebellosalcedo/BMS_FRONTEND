import { MENU_RESPONSE_CODES } from "../../app/layout/errors/menu.errors.codes"
import {AUTH_RESPONSE_MESSAGES } from "../../modules/auth/responseMessage/authMessage"
import { ROL_MESSAGE } from "../../modules/settings/roles/responseMessage/rolMessage";
import { formatMessage } from "./formatterMessage";

const MESSAGES_MAP: Record<string, string> = {
    ...AUTH_RESPONSE_MESSAGES,
    ...MENU_RESPONSE_CODES,
    ...ROL_MESSAGE
}

export const getMessageResponse = (code: string, params?: Record<string, string | number>): string => {

    const template = MESSAGES_MAP[code];

    if(!template){  
        return "Ocurrió un error inesperado";
    }

    return formatMessage( template , params ); 
}