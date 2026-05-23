import type { FC } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../../features/auth/auth-slice";

type Props = {
    setShowUserMenu: (open: boolean) => void
}

const HeaderUser: FC<Props> = ({
    setShowUserMenu
}) => {

    const dispatch = useAppDispatch();

    const logoutUser = () => {

        dispatch(logout());

    }

    return (
        <>
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ zIndex: 1060 }}
                onClick={() => setShowUserMenu(false)}
            />
            <div
                className="position-absolute end-0 mt-2 bg-body rounded-3 shadow-lg border py-2"
                style={{ width: '200px', zIndex: 1060 }}
            >
                <a href="/perfil" className="dropdown-item d-flex align-items-center gap-2 px-3 py-2">
                    <i className="bi bi-person"></i>
                    Mi Perfil
                </a>
                <a href="/configuracion" className="dropdown-item d-flex align-items-center gap-2 px-3 py-2">
                    <i className="bi bi-gear"></i>
                    Configuracion
                </a>
                <hr className="my-2" />
                <button
                    onClick={() => {

                        logoutUser();

                    }}
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 text-danger w-100 border-0 bg-transparent text-start">
                    <i className="bi bi-box-arrow-right"></i>
                    Cerrar Sesion
                </button>
            </div>
        </>
    )
}

export default HeaderUser;