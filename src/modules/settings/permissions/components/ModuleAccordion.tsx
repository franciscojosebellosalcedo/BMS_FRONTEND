import Accordion from "react-bootstrap/Accordion";
import type { TMenu } from "../../../../app/layout/types/menu.type";
import type { TRolPermission } from "../types/rolPermissiontype";
import SubModuleAccordion from "./SubModuleAccordion";
import type { THandlerPermission } from "../types/handlerType";

type Props = {
    module: TMenu;
    permissionsRol: TRolPermission[];
    handlePermissionRol: ( data: THandlerPermission ) => void;
};

const ModuleAccordion = ({
    module,
    permissionsRol,
    handlePermissionRol,
}: Props) => {

    return (
        <Accordion.Item
            eventKey={module.module.modulo_Id.toString()}
        >

            <Accordion.Header>

                <div className="d-flex align-items-center w-100">

                    <i className="bi bi-grid-fill me-2 text-primary fs-4"></i>

                    <div className="flex-grow-1">

                        <div className="fw-bold">
                            {module.module.modulo_Nombre}
                        </div>

                        <small className="text-muted">
                            {module.submodules.length} submódulos
                        </small>

                    </div>

                </div>

            </Accordion.Header>

            <Accordion.Body className="p-2">

                <Accordion alwaysOpen>

                    {
                        module.submodules.map(data => (

                            <SubModuleAccordion
                                key={data.submodule?.submo_Id}
                                submodule={data}
                                permissionsRol={permissionsRol}
                                handlePermissionRol={handlePermissionRol}
                            />

                        ))
                    }

                </Accordion>

            </Accordion.Body>

        </Accordion.Item>
    );
};

export default ModuleAccordion;