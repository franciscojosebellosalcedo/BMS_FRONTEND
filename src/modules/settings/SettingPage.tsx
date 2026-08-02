import { Navigate, Route, Routes } from "react-router-dom";
import { ACTIONS_COMMON_ROUTES, ROUTES } from "../../app/utils/menu/appRoutes";
import FormRol from "./roles/components/FormRol";
import TableRols from "./roles/components/TableRol";
import { ENTITY_ROUTES } from "../../app/utils/menu/entitiesRoutes";

const SettingPage = () => {
    return (
        <Routes>
            <Route path={ENTITY_ROUTES.SETTING_ROLS} element={<TableRols />} />

            <Route path={`${ENTITY_ROUTES.SETTING_ROLS}/${ACTIONS_COMMON_ROUTES.CREATE}`} element={<FormRol/>} />

            <Route path={`${ENTITY_ROUTES.SETTING_ROLS}/${ACTIONS_COMMON_ROUTES.UPDATE}/:id`} element={<FormRol/>} />

            <Route path='*' element={<Navigate to={ROUTES.ERROR_404} />} />

        </Routes>
    )
}

export default SettingPage;