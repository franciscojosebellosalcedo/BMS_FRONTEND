import type { TRol } from "../settings/roles/types";

export type TUser = {
    usua_Id?: number;
    usua_Nombre: string;
    usua_NombreUsuario: string;
    usua_Activo?: boolean;
    usua_Contrasenia: string;
    usua_RolId: number;
    usua_Creacion?: Date
    usua_Modificacion?: Date
    usua_CreacionId?: number
    usua_ModificacionId?: number
}

export type TLogin = {
    usua_NombreUsuario: string;
    usua_Contrasenia: string
}

export type TLoginResponse = {
    user: TUser;
    rol: TRol;
    refressToken: string;
    accessToken: string;
}