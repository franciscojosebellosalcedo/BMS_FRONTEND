import { useNavigate } from "react-router-dom"
import { appConfig } from "../../../app/app-config"

const Error404 = () => {

    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center bg-body"
            style={{
                minHeight: "100vh",
                padding: "2rem"
            }}
        >
            <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-4"
                style={{
                    width: "120px",
                    height: "120px"
                }}
            >
                <i
                    className="bi bi-exclamation-triangle text-primary"
                    style={{
                        fontSize: "4rem"
                    }}
                ></i>
            </div>

            <h1
                className="fw-bold text-primary mb-2"
                style={{
                    fontSize: "6rem",
                    lineHeight: 1
                }}
            >
                404
            </h1>

            <h2 className="fw-semibold mb-3">
                Página no encontrada
            </h2>

            <p
                className="text-secondary mb-4"
                style={{
                    maxWidth: "500px",
                    fontSize: "1.05rem"
                }}
            >
                La página que intentas visualizar no existe o fue movida dentro del sistema BMS.
            </p>

            <div className="d-flex gap-3 flex-wrap justify-content-center">
                <button
                    onClick={()=>{

                        navigate("/page/dashboard");

                    }}
                    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                >
                    <i className="bi bi-house-door"></i>
                    Ir al inicio
                </button>
            </div>

            <div
                className="position-absolute bottom-0 mb-4 text-secondary small"
            >
                {appConfig.name} · {appConfig.description}
            </div>
        </div>
    )
}

export default Error404