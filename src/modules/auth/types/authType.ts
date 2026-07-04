import type { TRol } from "../../settings/roles/types/rolType";
import type { TUserPermission } from "./userPermissionType";
import type { TUser } from "./userType";

export type TLogin = {
    usua_NombreUsuario: string,
    usua_Contrasenia: string
}

export type TLoginResponse = {
    user: TUser,
    rol: TRol,
    permissions: TUserPermission[],
    refressToken: string,
    accessToken: string
}