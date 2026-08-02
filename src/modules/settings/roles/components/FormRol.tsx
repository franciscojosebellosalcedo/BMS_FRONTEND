import { useFormik } from "formik";
import Separator from "../../../../shared/components/Separator";
import TitleContent from "../../../../shared/components/TitleContent";
import type { TDataRol, TRol } from "../types/rolType";
import * as Yup from "yup";
import { Button, Form, InputGroup } from "react-bootstrap";
import clsx from "clsx";
import TextError from "../../../../shared/components/TextError";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../app/store/hooks";
import { setComponent } from "../../../../features/layout/layoutSlice";
import { getMessageResponse } from "../../../../shared/responseMessage/getMessageResponse";
import toast from "react-hot-toast";
import rolApi from "../api/rolApi";
import type { TResponseHttp } from "../../../../shared/types/responseType";
import Loading from "../../../../shared/components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../app/utils/menu/appRoutes";
import { useAntiSpam } from "../../../../shared/hooks/useAntiSpam";
import { addRol } from "../../../../features/rol/rolSlice";
import Permissions from "../../permissions/components/Permissions";
import type { THandlerPermission } from "../../permissions/types/handlerType";
import type { TRolPermission } from "../../permissions/types/rolPermissiontype";

const initialValues: TRol = {
    rol_Nombre: "",
    rol_Descripcion: ""
}

const validationSchema = Yup.object().shape({
    rol_Nombre: Yup.string()
        .trim()
        .required("Se requiere nombre del rol"),

    rol_Descripcion: Yup.string()
        .trim()
        .optional()
})

const FormRol = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { runWithLock } = useAntiSpam();

    const dispatch = useAppDispatch();

    const [permissions, setPermissions] = useState<TRolPermission[]>([]);

    const params = useParams();

    const [isLoadingGetRol, setIsLoadingGetRol] = useState(false);

    const [rolFound, setRolFound] = useState<TDataRol | null>(null);

    const handlePermissionRol = ({
        optionId,
        action,
        value
    }: THandlerPermission) => {

        setPermissions(prev => {

            const exist = prev.find(
                permission => permission.perol_OpcionId === optionId
            );

            if (action === "access") {

                if (value && !exist) {

                    return [
                        ...prev,
                        {
                            perol_OpcionId: optionId,
                            perol_Crear: false,
                            perol_Editar: false,
                            perol_CambiarEstado: false
                        }
                    ];

                }

                if (!value) {

                    return prev.filter(
                        permission => permission.perol_OpcionId !== optionId
                    );

                }

                return prev;
            }

            if (!exist) return prev;

            if (action === "create") {

                return prev.map(permission =>

                    permission.perol_OpcionId === optionId
                        ? {
                            ...permission,
                            perol_Crear: value
                        }
                        : permission

                );

            }

            if (action === "edit") {

                return prev.map(permission =>

                    permission.perol_OpcionId === optionId
                        ? {
                            ...permission,
                            perol_Editar: value
                        }
                        : permission

                );

            }

            return prev.map(permission =>

                permission.perol_OpcionId === optionId
                    ? {
                        ...permission,
                        perol_CambiarEstado: value
                    }
                    : permission

            );

        });

    };

    const navigateToBack = () => {
        navigate(ROUTES.SETTING_ROLS)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: TRol) => {

            await createRol(values);

        }
    });

    const sendForm = () => {
        formik.submitForm();
    }

    const getRolById = async (idRol: number) => {
        try {

            setIsLoadingGetRol(true);

            const responseHttp: TResponseHttp<TDataRol> = await rolApi.getRolById(idRol);

            const data = responseHttp.data;

            formik.setValues({...data.rol})

            setPermissions( data.permissions );

            setRolFound(data);

        } catch (error: any) {

            const code = error?.response?.data?.code;

            const menssage = getMessageResponse(code);

            toast.error(menssage);

            navigate( ROUTES.SETTING_ROLS );

        } finally {

            setIsLoadingGetRol(false);

        }
    }

    const createRol = async (values: TRol) => {

        try {

            setIsLoading(true);

            const responseHttp: TResponseHttp<TDataRol> = await rolApi.create({
                rol: values,
                permissions: permissions
            });

            const data = responseHttp.data;

            dispatch(addRol(data.rol));

            if (responseHttp.ok) {

                const message = getMessageResponse(responseHttp.code, { nameRol: data.rol.rol_Nombre });

                toast.success(message);

                navigateToBack();

            }

            setIsLoading(false);

        } catch (error: any) {

            const code = error?.response?.data?.code;
            const message = getMessageResponse(code);

            toast.error(message);

        } finally {

            setIsLoading(false);

        }

    }

    const handlerKeydown = (e: KeyboardEvent) => {

        if (!isLoading && !e.repeat && e.key === "Enter") {
            runWithLock(sendForm)
        }

    }

    useEffect(() => {

        if (!params.id) return;

        getRolById(Number(params.id));

    }, [params.id]);

    useEffect(() => {

        if (!isLoadingGetRol) {

            dispatch(setComponent(
                <div className="d-flex justify-content-end">
                    <Button
                        disabled={isLoading}
                        className="btn btn-sm btn-secondary me-2"
                        type="button"
                        onClick={navigateToBack}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={sendForm}
                        disabled={isLoading}
                        className="btn btn-sm btn-primary"
                        type="button">

                        {
                            isLoading ? <Loading /> : "Guardar"
                        }
                    </Button>
                </div>
            ));
        }

        return () => {
            dispatch(setComponent(null));
        };

    }, [isLoading, permissions, params.id, isLoadingGetRol]);

    useEffect(() => {

        window.addEventListener("keydown", handlerKeydown);

        return () => {

            window.removeEventListener("keydown", handlerKeydown);

        }

    }, [isLoading, permissions]);

    return (
        <section>

            <TitleContent title={params.id ? "Editar rol" : "Nuevo rol"} />

            <Separator />

            {
                isLoadingGetRol ? <Loading /> :
                    <>
                        <>
                            <div className='row mb-2'>
                                <div className='col-12 col-sm-6 mb-1 mt-1'>
                                    <InputGroup size='sm' className='mb-3'>
                                        <InputGroup.Text id='inputGroup-sizing-default'>Nombre</InputGroup.Text>
                                        <Form.Control
                                            autoFocus
                                            onChange={(e) => {

                                                const value = e.target.value.trim();
                                                formik.setFieldValue("rol_Nombre", value);

                                            }}
                                            placeholder='Nombre del rol'
                                            name='rol_Nombre'
                                            value={formik.values.rol_Nombre}
                                            type='text'
                                            className={clsx(
                                                'form-control',
                                                {
                                                    'is-invalid': formik.touched.rol_Nombre && formik.errors.rol_Nombre,
                                                },
                                                {
                                                    'is-valid': formik.touched.rol_Nombre && !formik.errors.rol_Nombre,
                                                }
                                            )}
                                        />
                                    </InputGroup>
                                    {formik.touched.rol_Nombre && formik.errors.rol_Nombre && (
                                        <TextError message={formik.errors.rol_Nombre} typeAlert="danger" />
                                    )}
                                </div>

                                <div className='col mb-1 mt-1'>
                                    <InputGroup size='sm' className='mb-3'>
                                        <InputGroup.Text id='inputGroup-sizing-default'>
                                            Descripción (Opcional)
                                        </InputGroup.Text>
                                        <Form.Control
                                            onChange={(e) => {

                                                const value = e.target.value.trim();
                                                formik.setFieldValue("rol_Descripcion", value);

                                            }}
                                            placeholder='Descripción del rol'
                                            value={formik.values.rol_Descripcion}
                                            name='rol_Descripcion'
                                            type='text'
                                            className={clsx(
                                                'form-control',
                                                {
                                                    'is-invalid':
                                                        formik.touched.rol_Descripcion && formik.errors.rol_Descripcion,
                                                },
                                                {
                                                    'is-valid':
                                                        formik.touched.rol_Descripcion && !formik.errors.rol_Descripcion,
                                                }
                                            )}
                                        />
                                    </InputGroup>
                                    {formik.touched.rol_Descripcion && formik.errors.rol_Descripcion && (
                                        <TextError message={formik.errors.rol_Descripcion} typeAlert="danger" />
                                    )}
                                </div>
                            </div>

                        </>

                        <TitleContent title="Permisos" />

                        <Separator />

                        <Permissions
                            permissionsRol={permissions}
                            handlerPermissionRol={handlePermissionRol}
                        />

                        <div className="d-flex justify-content-end mt-2">
                            <Button
                                disabled={isLoading}
                                className="btn btn-sm btn-secondary me-2"
                                type="button"
                                onClick={navigateToBack}
                            >
                                Cancelar
                            </Button>

                            <Button
                                onClick={sendForm}
                                disabled={isLoading}
                                className="btn btn-sm btn-primary"
                                type="button">

                                {
                                    isLoading ? <Loading /> : "Guardar"
                                }
                            </Button>
                        </div>
                    </>
            }

        </section>
    )
}

export default FormRol;