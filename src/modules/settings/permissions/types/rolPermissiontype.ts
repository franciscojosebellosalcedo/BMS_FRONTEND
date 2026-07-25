
export type TRolPermission = {
    perol_Id ?: number;
    perol_RolId?: number;
    perol_OpcionId: number;
    perol_Crear: boolean;
    perol_Editar: boolean;
    perol_CambiarEstado: boolean;
    perol_CreacionId?: number;
    perol_ModificacionId?: number;
    perol_Modificacion?: Date;
    perol_Creacion?: Date;
}