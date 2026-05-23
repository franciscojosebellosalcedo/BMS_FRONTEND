import { AUTH_ERROR_MESSAGES } from "../../modules/auth/errors/authErrorMessage"

const ERROR_MAP: Record<string, string> = {
    ...AUTH_ERROR_MESSAGES
}

export const getErrorMessage = (code?: string): string => {

    if (!code) {
        return "Ocurrió un error inesperado"
    }

    return ERROR_MAP[code] || "Ocurrió un error inesperado"
}