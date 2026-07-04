
export const MODULE: Record<string, string> = {
    sales: "Ventas",
    products: "Productos",
    orders: "Pedidos",
    inventory: "Inventario",
    customers: "Clientes",
    rols: "Roles",
    reports: "Reportes",
    settings: "Configuración",
    dashboard: "Inicio"
};

export const ENTITY: Record< string , string> = {
    rols: "Roles"
}

export const ACTION : Record<string, string> = {
    new: "Nuevo",
    edit: "Editar",
}

export const LABELS = {
    ...MODULE, ...ENTITY, ...ACTION
}