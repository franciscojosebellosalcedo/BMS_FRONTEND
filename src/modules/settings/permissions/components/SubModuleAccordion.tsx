import type { FC } from "react";
import Accordion from "react-bootstrap/Accordion";
import type { TSubModuleItem } from "../../../../app/layout/types/menu.type";
import type { TRolPermission } from "../types/rolPermissiontype";
import type { THandlerPermission } from "../types/handlerType";
import PermissionItem from "./PermissionItem";

type Props = {
    submodule: TSubModuleItem;
    permissionsRol: TRolPermission[];
    handlePermissionRol: (data: THandlerPermission) => void;
};

const SubModuleAccordion: FC<Props> = ({
    submodule,
    permissionsRol,
    handlePermissionRol
}) => {

    return (

        <Accordion.Item
            eventKey={`${submodule.submodule?.submo_Id}`}
        >

            <Accordion.Header>

                <div className="d-flex justify-content-between align-items-center w-100 pe-3">

                    <div className="d-flex align-items-center">

                        <i className="bi bi-folder2-open text-warning fs-5 me-2"></i>

                        <span className="fw-semibold">

                            {submodule.submodule?.submo_Nombre}

                        </span>

                    </div>

                    <small className="text-muted">

                        {submodule.options?.length} opciones

                    </small>

                </div>

            </Accordion.Header>

            <Accordion.Body className="p-2">

                <div className="d-flex flex-column gap-3">

                    {

                        submodule?.options?.map(option => (

                            <PermissionItem

                                key={option.opci_Id}

                                option={option}

                                permission={permissionsRol?.find(
                                    permission =>
                                        permission.perol_OpcionId === option.opci_Id
                                )}

                                handlePermissionRol={handlePermissionRol}

                            />

                        ))

                    }

                </div>

            </Accordion.Body>

        </Accordion.Item>

    );

};

export default SubModuleAccordion;