import type { FC, ReactNode } from "react";
import type { TActionPermission } from "../../../modules/settings/permissions/types/handlerType";
import type { TUserPermission } from "../../../modules/auth/types/userPermissionType";

type Props = {
    action: TActionPermission;
    permission: TUserPermission | null;
    children: ReactNode;
}

const PermissionActionGuard : FC<Props> = ({
    action,
    permission,
    children
}) => {

    const permissionAction = () =>{

        if( action === "create") return permission?.peusua_Crear;
        if( action === "edit") return permission?.peusua_Editar;
        if( action === "changeStatus") return permission?.peusua_CambiarEstado;

        return false;
    }

    return (
        <>
            {
                permissionAction() ? {children} : <></>
            }
        </>
    )
}

export default PermissionActionGuard;