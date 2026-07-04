import type { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import Loading from "./Loader";

type Props = {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
    onClose: () => Promise<void>;
    isLoading: boolean
}

const ConfirmAction: FC<Props> = ({
    isOpen,
    title,
    description,
    onConfirm,
    onClose,
    isLoading
}) => {

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
        >

            <Modal.Header closeButton>
                <Modal.Title className="fs-5">{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <p className="fs-6">
                    {description}
                </p>

            </Modal.Body>

            <Modal.Footer>
                <div className="d-flex justify-content-end gap-3">
                    <Button
                        onClick={onClose}
                        className="btn btn-sm btn-secondary">
                        Cancelar
                    </Button>

                    <Button
                        className="btn btn-sm btn-primary"
                        onClick={onConfirm}
                    >
                        {
                            isLoading ? <Loading /> : "Confirmar"
                        }
                    </Button>

                </div>
            </Modal.Footer>

        </Modal>
    )
}

export default ConfirmAction;