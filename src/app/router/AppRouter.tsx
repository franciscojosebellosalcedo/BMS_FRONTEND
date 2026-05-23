import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../../modules/auth/components/Login";
import PrivateRoutes from "./PrivateRoutes";
import { MainLayout } from "../layout/components/MainLayaut";
import Dashboard from "../../modules/dashboard/components/Dashboard";
import ErrorsPage from "../../modules/errors/ErrorsPage";

const AppRouter = () => {
    return (
        <BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
            <Routes>

                <Route
                    element={<PublicRoutes />}
                >
                    <Route path="/login" element={<Login />} />

                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route element={<MainLayout />}>

                        <Route path="/page/dashboard" element={<Dashboard />} />

                    </Route>
                </Route>

                <Route
                    path='/errors/page/*'
                    element={
                        <ErrorsPage />
                    }
                />

                <Route path='*' element={<Navigate to='/errors/page/404' />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;