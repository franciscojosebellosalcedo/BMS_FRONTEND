import { AUTH_RESPONSE_CODES } from "./codesMessage";

export const AUTH_RESPONSE_MESSAGES: Record<string, string> = {
    [AUTH_RESPONSE_CODES.AUTH_INVALID_CREDENTIALS]:
        "Usuario o contraseña incorrectos",

    [AUTH_RESPONSE_CODES.AUTH_USER_DISABLE]:
        "El usuario está deshabilitado",
}