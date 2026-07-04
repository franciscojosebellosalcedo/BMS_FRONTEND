import { ENTITY_ROUTES } from "./entitiesRoutes";
import { MODULE_ROUTES } from "./moduleRoutes";

export const ACTIONS_COMMON_ROUTES = {
    CREATE: "new",
    UPDATE: "update"
}

export const ROUTES = {

    HOME: "/page/dashboard",

    AUTH_LOGIN: "/login",

    ERROR_404: `/${MODULE_ROUTES.ERROR}/page/404`,

    SETTING_ROLS: `/${MODULE_ROUTES.CONFIGURACION}/page/${ENTITY_ROUTES.SETTING_ROLS}`,
    SETTING_NEW_ROL: `/${MODULE_ROUTES.CONFIGURACION}/page/${ENTITY_ROUTES.SETTING_ROLS}/${ACTIONS_COMMON_ROUTES.CREATE}`,

};