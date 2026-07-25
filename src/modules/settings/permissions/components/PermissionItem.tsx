import type { FC } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import type { TOption } from "../../../../app/layout/types/menu.type";
import type { TRolPermission } from "../types/rolPermissiontype";
import type { THandlerPermission } from "../types/handlerType";

type Props = {
    option: TOption;
    permission?: TRolPermission;
    handlePermissionRol: (data: THandlerPermission) => void;
};

const PermissionItem: FC<Props> = ({
    option,
    permission,
    handlePermissionRol
}) => {

    const hasPermission = !!permission;

    return (

        <Card className="shadow-sm border">

            <Card.Body>

                <Row className="align-items-center gy-3">

                    <Col lg={4} md={12}>

                        <div className="fw-semibold">

                            {option.opci_Nombre}

                        </div>

                    </Col>

                    <Col lg={8} md={12}>

                        <Row className="gy-2">

                            <Col xl={3} sm={6} xs={12}>

                                <Form.Check
                                    type="switch"
                                    label="Acceso"
                                    checked={hasPermission}
                                    onChange={(e) =>
                                        handlePermissionRol({
                                            optionId: option.opci_Id,
                                            action: "access",
                                            value: e.target.checked
                                        })
                                    }
                                />

                            </Col>

                            <Col xl={3} sm={6} xs={12}>

                                <Form.Check
                                    type="switch"
                                    label="Crear"
                                    disabled={!hasPermission}
                                    checked={permission?.perol_Crear ?? false}
                                    onChange={(e) =>
                                        handlePermissionRol({
                                            optionId: option.opci_Id,
                                            action: "create",
                                            value: e.target.checked
                                        })
                                    }
                                />

                            </Col>

                            <Col xl={3} sm={6} xs={12}>

                                <Form.Check
                                    type="switch"
                                    label="Editar"
                                    disabled={!hasPermission}
                                    checked={permission?.perol_Editar ?? false}
                                    onChange={(e) =>
                                        handlePermissionRol({
                                            optionId: option.opci_Id,
                                            action: "edit",
                                            value: e.target.checked
                                        })
                                    }
                                />

                            </Col>

                            <Col xl={3} sm={6} xs={12}>

                                <Form.Check
                                    type="switch"
                                    label="Cambiar estado"
                                    disabled={!hasPermission}
                                    checked={permission?.perol_CambiarEstado ?? false}
                                    onChange={(e) =>
                                        handlePermissionRol({
                                            optionId: option.opci_Id,
                                            action: "changeStatus",
                                            value: e.target.checked
                                        })
                                    }
                                />

                            </Col>

                        </Row>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );
};

export default PermissionItem;