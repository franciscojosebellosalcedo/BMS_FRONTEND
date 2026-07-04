
export type TUserPermission = {
    peusua_Id?: number,
    peusua_UsuarioId: number,
    peusua_OpcionId: number,
    peusua_Crear: boolean,
    peusua_Editar: boolean,
    peusua_CambiarEstado: boolean,
    peusua_Creacion?: Date,
    peusua_Modificacion?: Date,
    peusua_CreacionId?: number,
    peusua_ModificacionId?: number
}