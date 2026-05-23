import { Navigate, Outlet } from "react-router-dom";
import type { TUser } from "../../modules/auth/types";
import { useAppSelector } from "../store/hooks";

const PublicRoutes = () => {

    const user: TUser | null = useAppSelector(( state ) => state.auth.user );

    return (
        !user ? <Outlet/> : <Navigate to={"/page/dashboard"}/>
    );
    
}

export default PublicRoutes;