import type { FC, ReactNode } from "react"

type Props = {
    entityName: string
    children: ReactNode
}

const PermissionGuard: FC<Props> = ({
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