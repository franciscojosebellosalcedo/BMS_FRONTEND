import type { FC } from "react";
import type { TMenu } from "../../../../app/layout/types/menu.type";
import { useAppSelector } from "../../../../app/store/hooks";
import ModuleAccordion from "./ModuleAccordion";
import type { THandlerPermission } from "../types/handlerType";
import { Accordion } from "react-bootstrap";
import type { TRolPermission } from "../types/rolPermissiontype";

type Props = {
    handlerPermissionRol: ( data: THandlerPermission) => void;
    permissionsRol: TRolPermission[]
}

const Permissions: FC<Props> = ({
    handlerPermissionRol,
    permissionsRol
}) => {

    const menu: TMenu[] = useAppSelector(state => state.layout.menu );

    return (
        <Accordion alwaysOpen >
            {
                menu.map((data) => {
                    return (
                        <ModuleAccordion
                            key={ data.module.modulo_Id}
                            handlePermissionRol={ handlerPermissionRol }
                            module={ data }
                            permissionsRol={ permissionsRol }
                        />
                    )
                })
            }
        </Accordion>
    )
}

export default Permissions;