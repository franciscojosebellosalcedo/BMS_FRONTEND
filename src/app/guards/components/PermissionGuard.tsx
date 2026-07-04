import type { FC, ReactNode } from "react"
import type { TUserPermission } from "../../../modules/auth/types/userPermissionType"

type Props = {
    entityName: string
    permission: TUserPermission | null,
    children: ReactNode
}

const PermissionGuard: FC<Props> = ({
    permission,
    entityName,
    children
}) => {
    return (
        <>
            {
                false ?
                    <div>
                        <h4 className="fw-bold fs-5">{entityName}</h4>
                        <small>No tienes permisos para {entityName}.</small>
                    </div>
                    : children

            }
        </>
    )
}

export default PermissionGuard