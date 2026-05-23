import { AUTH_ERROR_CODES } from "./authErrorCode";

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
    [AUTH_ERROR_CODES.AUTH_INVALID_CREDENTIALS]:
        "Usuario o contraseña incorrectos",

    [AUTH_ERROR_CODES.AUTH_USER_DISABLE]:
        "El usuario está deshabilitado",
}