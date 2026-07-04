import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { TUser } from "../../modules/auth/types/userType";

const PrivateRoutes = () => {

    const user: TUser | null = useAppSelector(( state ) => state.auth.user );

    return (
        user ? <Outlet/> : <Navigate to={"/login"}/>
    )
}

export default PrivateRoutes;