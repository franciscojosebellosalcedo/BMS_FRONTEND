import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../app/utils/menu/appRoutes";
import ItemsPerPage from "../../../../shared/components/ItemsPerPage";
import Loading from "../../../../shared/components/Loader";
import Pagination from "../../../../shared/components/Pagination";
import Search from "../../../../shared/components/Search";
import { getMessageResponse } from "../../../../shared/responseMessage/getMessageResponse";
import type { TDataInputSelect } from "../../../../shared/types/globalType";
import type { TPaginator } from "../../../../shared/types/paginatorType";
import type { TResponseHttp } from "../../../../shared/types/responseType";
import rolApi from "../api/rolApi";
import type { TRol } from "../types/rolType";
import RolItem from "./RolItem";
import PermissionGuard from "../../../../app/guards/components/PermissionGuard";
import ConfirmAction from "../../../../shared/components/ConfirmAction";

const TableRols = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [itemsPerPage, setItemsPerPage] = useState(20);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    const [totalRecords, setTotalRecords] = useState(0);

    const [data, setData] = useState<TRol[]>([]);

    const [ rolSelected , setRolSelected ] = useState<TRol | null>( null );

    const [ isLoadingChangeStatus , setIsLoadingChangeStatus ] = useState( false );

    const [ isOpenConfirmChangeStatus, setIsOpenConfirmChangeStatus ] = useState( false );

    const onCloseConfirmChangeStatus = async () =>{

        setIsOpenConfirmChangeStatus( false );

    }

    // chenge status
    const changeStatus = async () =>{

        try {

            setIsLoadingChangeStatus( true )
            
        } catch (error) {
            
        }
        
    }

    const initChangeStatus = ( rol: TRol ) =>{

        setRolSelected( rol );
        setIsOpenConfirmChangeStatus( true );

    }

    // paginate rols
    const paginateRols = async (page: number, itemsPerPage: number) => {

        try {

            setIsLoading(true);

            const responseHttp: TResponseHttp<TPaginator> = await rolApi.paginate(page, itemsPerPage);
            const dataResponse = responseHttp.data;

            setTotalPages(dataResponse.totalPages);
            setCurrentPage(dataResponse.page);
            setData(dataResponse.records);
            setTotalRecords(dataResponse.totalRecords);

            setIsLoading(false);

        } catch (error: any) {

            const code = error?.response?.data?.code;
            const message = getMessageResponse(code);

            toast.error(message);

            setIsLoading(false);

        } finally {

            setIsLoading(false);

        }
    }

    const paginate = (page: number) => {

        paginateRols(page, itemsPerPage);

    }

    useEffect(() => {

        paginateRols(currentPage, itemsPerPage);

    }, [currentPage]);

    return (
        <PermissionGuard entityName="Roles">

            <div className="card shadow-sm border-0">

                <div className="card-header border-0">

                    <div className="row gy-3 align-items-end">

                        <div className="col-12 col-lg">
                            <h5 className="mb-0 fw-bold">
                                Roles
                            </h5>

                            <small className="text-muted">
                                Sobre {totalRecords} roles
                            </small>
                        </div>

                        <ConfirmAction
                            description={`¿Desea ${rolSelected?.rol_Activo ? "Deshabilitar" : "habilitar"} el rol ${rolSelected?.rol_Nombre}?`}
                            isOpen = { isOpenConfirmChangeStatus }
                            onClose={onCloseConfirmChangeStatus}
                            onConfirm={ changeStatus }
                            isLoading = { isLoadingChangeStatus }
                            title={`Habilitar/Deshabilitar rol # ${rolSelected?.rol_Id}`}
                        />

                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ItemsPerPage
                                itemsPerPage={itemsPerPage}
                                onChange={(selected: TDataInputSelect) => {
                                    setItemsPerPage(selected.value);
                                    paginateRols(1, selected.value);
                                }}
                            />
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <Search
                                className=""
                                placeholder="Buscar rol"
                                handlerSearch={() => { }}
                                handlerResetSearch={() => { }}
                                valueSearch=""
                                setValueSearch={() => { }}
                            />
                        </div>

                        {/* create rol */}
                        <div className="col-12 col-md-auto">
                            <Button
                                className="btn btn-primary w-100"
                                type="button"
                                onClick={() => navigate(ROUTES.SETTING_NEW_ROL)}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                Crear rol
                            </Button>
                        </div>

                    </div>

                </div>

                {
                    isLoading ? <Loading /> :
                        <div className="card-body p-0">
                            <div
                                className="table-responsive"
                                style={{ maxHeight: "400px", overflowY: "auto" }}
                            >
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="sticky-top">
                                        <tr>
                                            <th className="ps-3 min-w-300 text-muted">Nombre</th>
                                            <th className="min-w-150 text-muted">Creación</th>
                                            <th className="min-w-150 text-muted">Status</th>
                                            <th className="text-end pe-4 min-w-100"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((rol) => {
                                                return (
                                                    <RolItem
                                                        key={rol.rol_Id}
                                                        initChangeStatus = { initChangeStatus }
                                                        rol={rol}
                                                    />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                paginate={paginate}
                                totalPages={totalPages}
                            />
                        </div>
                }

            </div>
        </PermissionGuard>
    )
}

export default TableRols;