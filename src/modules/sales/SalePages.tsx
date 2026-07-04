import { Navigate, Route, Routes } from "react-router-dom";
import Products from "./catalogs/products/components/Products";
import { ACTIONS_COMMON_ROUTES, ROUTES } from "../../app/utils/menu/appRoutes";
import { ENTITY_ROUTES } from "../../app/utils/menu/entitiesRoutes";

const SalePages = () => {
    return (
        <Routes>
            <Route path={ENTITY_ROUTES.SALES_PRODUCTS} element={<Products />} />

            <Route path={`${ENTITY_ROUTES.SALES_PRODUCTS}/${ACTIONS_COMMON_ROUTES.CREATE}`} element={<>Create</>} />

            <Route path='*' element={<Navigate to={ROUTES.ERROR_404} />} />

        </Routes>
    )
}

export default SalePages;