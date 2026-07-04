import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { appConfig } from "../../../app/app.config";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useAppDispatch } from "../../../app/store/hooks";
import { TEXT_REFRESS_TOKEN } from "../../../constants/authConstant";
import { login } from "../../../features/auth/authSlice";
import LabelInput from "../../../shared/components/LabelInput";
import { getMessageResponse } from "../../../shared/responseMessage/getMessageResponse";
import { useAntiSpam } from "../../../shared/hooks/useAntiSpam";
import { setItemLocalStorage } from "../../../shared/utils/localStorageUtils";
import { authApi } from "../api/authApi";
import type { TLogin, TLoginResponse } from "../types/authType";
import TextError from "../../../shared/components/TextError";
import Loading from "../../../shared/components/Loader";

const initialValues: TLogin = {
    usua_NombreUsuario: "",
    usua_Contrasenia: ""
}

const validationSchema = Yup.object().shape({
    usua_NombreUsuario: Yup.string()
        .required("Se requiere usuario"),

    usua_Contrasenia: Yup.string()
        .required("Se requiere contraseña")

});

export default function LoginPage() {

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const { theme } = useTheme();

    const { runWithLock } = useAntiSpam();

    const loginUser = async (values: TLogin) => {

        setIsLoading(true);

        try {

            setError("")

            const responseHttp = await authApi.login(values);
            const dataResponse: TLoginResponse = responseHttp.data;

            if (responseHttp.ok) {

                dispatch(login(dataResponse));

                setItemLocalStorage(TEXT_REFRESS_TOKEN, dataResponse.refressToken);

            }

        } catch (error: any) {

            const code = error?.response?.data?.code;
            const message = getMessageResponse(code);

            setError(message);

        } finally {

            setIsLoading(false);

        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TLogin) => {
            await loginUser(values);
        }
    });

    const handleSubmit = () => {

        formik.submitForm();

    }

    const handleKeydown = (e: KeyboardEvent) => {

        if (!isLoading && !e.repeat && e.key === "Enter") {

            runWithLock(() => {

                handleSubmit();

            });
        }
    }

    useEffect(() => {

        window.addEventListener("keydown", handleKeydown);

        return () => {

            window.removeEventListener("keydown", handleKeydown);

        }

    }, [isLoading]);

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        >
            <div
                className="card shadow-lg border-0"
                style={{
                    maxWidth: "420px",
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden"
                }}
            >
                <div
                    className="text-center text-white py-5 px-4"
                    style={{
                        background: theme === "dark"
                            ? "linear-gradient(135deg, #1a2332 0%, #2d3a4f 100%)"
                            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                    }}
                >
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                        style={{
                            width: "80px",
                            height: "80px",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        <i className="bi bi-building" style={{ fontSize: "2.5rem" }}></i>
                    </div>
                    <h2 className="fw-bold mb-1">{appConfig.name}</h2>
                    <p className="mb-0 opacity-75">{appConfig.description}</p>
                </div>

                <div className="card-body p-4 bg-body">
                    <h4 className="text-center mb-4 text-body">Iniciar Sesion</h4>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center py-2" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <form >
                        <div className="mb-3">
                            <LabelInput htmlFor="usua_NombreUsuario" title="Usuario" />
                            <InputGroup>
                                <span className="input-group-text bg-body-secondary border-end-0">
                                    <i className="bi bi-person-fill text-body-secondary"></i>
                                </span>
                                <Form.Control
                                    type="text"
                                    autoFocus={true}
                                    {...formik.getFieldProps("usua_NombreUsuario")}
                                    className={clsx(
                                        'form-control bg-transparent',
                                        {
                                            'is-invalid': formik.touched.usua_NombreUsuario && formik.errors.usua_NombreUsuario,
                                        },
                                        {
                                            'is-valid': formik.touched.usua_NombreUsuario && !formik.errors.usua_NombreUsuario,
                                        }
                                    )}
                                    placeholder="Ingresa tu usuario"

                                />
                            </InputGroup>
                            {
                                formik.touched.usua_NombreUsuario && formik.errors.usua_NombreUsuario &&
                                <TextError message={formik.errors.usua_NombreUsuario} />

                            }
                        </div>

                        <div className="mb-3">
                            <LabelInput htmlFor="usua_Contrasenia" title="Contraseña" />
                            <InputGroup>
                                <span className="input-group-text bg-body-secondary border-end-0">
                                    <i className="bi bi-lock-fill text-body-secondary"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("usua_Contrasenia")}
                                    className={clsx(
                                        'form-control bg-transparent',
                                        {
                                            'is-invalid': formik.touched.usua_Contrasenia && formik.errors.usua_Contrasenia,
                                        },
                                        {
                                            'is-valid': formik.touched.usua_Contrasenia && !formik.errors.usua_Contrasenia,
                                        }
                                    )}
                                    placeholder="Ingresa tu contrasena"
                                />
                                <button
                                    type="button"
                                    className="input-group-text bg-body-secondary border-start-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} text-body-secondary`}></i>
                                </button>
                            </InputGroup>
                            {
                                formik.touched.usua_Contrasenia && formik.errors.usua_Contrasenia &&
                                <TextError message={formik.errors.usua_Contrasenia} />
                            }
                        </div>

                        <button
                            type="button"
                            onClick={() => {

                                handleSubmit();

                            }}
                            className="btn w-100 py-2 text-white fw-semibold"
                            disabled={isLoading}
                            style={{
                                background: theme === "dark"
                                    ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                                    : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                border: "none",
                                borderRadius: "8px"
                            }}
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    Entrar
                                </span>
                            )}
                        </button>
                    </form>

                </div>

            </div>
        </div>
    )
}
