import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../../modules/auth/components/Login";
import PrivateRoutes from "./PrivateRoutes";
import { MainLayout } from "../layout/components/MainLayaut";
import Dashboard from "../../modules/dashboard/components/Dashboard";
import ErrorsPage from "../../modules/errors/ErrorsPage";
import { ROUTES } from "../utils/menu/appRoutes";
import SalePages from "../../modules/sales/SalePages";
import SettingPage from "../../modules/settings/SettingPage";
import AppInitializer from "../layout/components/AppInitializer";
import { MODULE_ROUTES } from "../utils/menu/moduleRoutes";

const AppRouter = () => {
    return (
        <BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
            <Routes>

                <Route
                    element={<PublicRoutes />}
                >
                    <Route path={ROUTES.AUTH_LOGIN} element={<Login />} />

                </Route>

                <Route element={<AppInitializer/>}>

                    <Route element={<PrivateRoutes />}>
                        <Route element={<MainLayout />}>

                            <Route path={ROUTES.HOME} element={<Dashboard />} />

                            <Route
                                path={`/${MODULE_ROUTES.VENTAS}/page/*`}
                                element={
                                    <SalePages />
                                }
                            />

                            <Route
                                path={`/${MODULE_ROUTES.CONFIGURACION}/page/*`}
                                element={
                                    <SettingPage />
                                }
                            />

                        </Route>
                    </Route>

                    <Route
                        path={`/${MODULE_ROUTES.ERROR}/page/*`}
                        element={
                            <ErrorsPage />
                        }
                    />

                </Route>

                <Route path='*' element={<Navigate to={ROUTES.ERROR_404} />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;