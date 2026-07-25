import type { FC } from "react";
import type { TRol } from "../types/rolType";
import { formatDate } from "../../../../shared/utils/utils";
import { Button } from "react-bootstrap";
import React from "react";
import { ROLES_CODE } from "../../../../constants/rolConstant";
import IconAction from "../../../../shared/icons/components/IconAction";

type Props = {
    rol: TRol;
    readOnly?: boolean;
    initChangeStatus?: (rol: TRol) => void;
}

const RolItem: FC<Props> = ({
    rol,
    initChangeStatus,
    readOnly
}) => {
    return (
        <tr>
            <td>
                <div className='ps-2 d-flex align-items-center fw-bold'> {rol.rol_Nombre} </div>
            </td>

            <td>
                {rol.rol_Activo ? (
                    <span className='fs-7 fw-semibold text-primary'>Activo</span>
                ) : (
                    <span className='fs-7 fw-semibold text-danger'>Inactivo</span>
                )}
            </td>

            <td>
                <span className='fs-7 fw-semibold text-primary'>{formatDate(rol.rol_Creacion)}</span>
            </td>

            <td className='text-end'>

                {
                    readOnly ? "" :
                        <React.Fragment>

                            {
                                !initChangeStatus || rol.rol_Codigo === ROLES_CODE.ADMIN ? "" : 

                                    <Button
                                        onMouseDown={() => initChangeStatus(rol)}
                                        className='btn btn-icon btn-secondary btn-sm me-1'
                                    >
                                        <IconAction  typeIcon="disable-enable" />
                                    </Button>
                            }

                        </React.Fragment>
                }

            </td>
        </tr>
    )
}

export default RolItem;