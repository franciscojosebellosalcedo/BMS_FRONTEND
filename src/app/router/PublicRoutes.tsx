import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { TUser } from "../../modules/auth/types/userType";

const PublicRoutes = () => {

    const user: TUser | null = useAppSelector(( state ) => state.auth.user );

    return (
        !user ? <Outlet/> : <Navigate to={"/page/dashboard"}/>
    );
    
}

export default PublicRoutes;