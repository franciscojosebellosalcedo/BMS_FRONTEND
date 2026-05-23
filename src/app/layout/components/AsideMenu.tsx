
import { useEffect, useState } from "react"
import { getNamesUser } from "../../../shared/utils/userUtils"
import { appConfig } from "../../app-config"
import { getNameRolCurrentUser } from "../../../shared/utils/rolUtils"

interface SubMenuOption {
    label: string
    href: string
}

interface SubModule {
    label: string
    icon: string
    options: SubMenuOption[]
}

interface MenuItem {
    id: string
    label: string
    icon: string
    href?: string
    subModules?: SubModule[]
}

const menuItems: MenuItem[] = [
    {
        id: "inicio",
        label: "Inicio",
        icon: "bi-house",
        href: "/"
    },
    {
        id: "ventas",
        label: "Ventas",
        icon: "bi-cart",
        subModules: [
            {
                label: "Pedidos",
                icon: "bi-bag",
                options: [
                    { label: "Nuevo pedido", href: "/ventas/pedidos/nuevo" },
                    { label: "Lista de pedidos", href: "/ventas/pedidos/lista" },
                    { label: "Pendientes", href: "/ventas/pedidos/pendientes" },
                    { label: "Completados", href: "/ventas/pedidos/completados" }
                ]
            },
            {
                label: "Cotizaciones",
                icon: "bi-file-text",
                options: [
                    { label: "Nueva cotizacion", href: "/ventas/cotizaciones/nueva" },
                    { label: "Historial", href: "/ventas/cotizaciones/historial" },
                    { label: "Plantillas", href: "/ventas/cotizaciones/plantillas" }
                ]
            },
            {
                label: "Devoluciones",
                icon: "bi-arrow-return-left",
                options: [
                    { label: "Registrar devolucion", href: "/ventas/devoluciones/nueva" },
                    { label: "Historial", href: "/ventas/devoluciones/historial" }
                ]
            }
        ]
    },
    {
        id: "inventario",
        label: "Inventario",
        icon: "bi-box-seam",
        subModules: [
            {
                label: "Productos",
                icon: "bi-boxes",
                options: [
                    { label: "Catalogo", href: "/inventario/productos/catalogo" },
                    { label: "Agregar producto", href: "/inventario/productos/nuevo" },
                    { label: "Categorias", href: "/inventario/productos/categorias" }
                ]
            },
            {
                label: "Movimientos",
                icon: "bi-arrow-left-right",
                options: [
                    { label: "Entradas", href: "/inventario/movimientos/entradas" },
                    { label: "Salidas", href: "/inventario/movimientos/salidas" },
                    { label: "Transferencias", href: "/inventario/movimientos/transferencias" }
                ]
            },
            {
                label: "Almacenes",
                icon: "bi-building",
                options: [
                    { label: "Lista de almacenes", href: "/inventario/almacenes/lista" },
                    { label: "Nuevo almacen", href: "/inventario/almacenes/nuevo" }
                ]
            }
        ]
    },
    {
        id: "eventos",
        label: "Eventos",
        icon: "bi-calendar-event",
        subModules: [
            {
                label: "Calendario",
                icon: "bi-calendar3",
                options: [
                    { label: "Ver calendario", href: "/eventos/calendario" },
                    { label: "Nuevo evento", href: "/eventos/calendario/nuevo" }
                ]
            },
            {
                label: "Reservaciones",
                icon: "bi-bookmark",
                options: [
                    { label: "Activas", href: "/eventos/reservaciones/activas" },
                    { label: "Historial", href: "/eventos/reservaciones/historial" },
                    { label: "Nueva reservacion", href: "/eventos/reservaciones/nueva" }
                ]
            },
            {
                label: "Servicios",
                icon: "bi-gear",
                options: [
                    { label: "Lista de servicios", href: "/eventos/servicios/lista" },
                    { label: "Paquetes", href: "/eventos/servicios/paquetes" }
                ]
            }
        ]
    },
    {
        id: "clientes",
        label: "Clientes",
        icon: "bi-people",
        subModules: [
            {
                label: "Directorio",
                icon: "bi-person-lines-fill",
                options: [
                    { label: "Todos los clientes", href: "/clientes/directorio" },
                    { label: "Nuevo cliente", href: "/clientes/directorio/nuevo" },
                    { label: "Importar", href: "/clientes/directorio/importar" }
                ]
            },
            {
                label: "Segmentos",
                icon: "bi-diagram-3",
                options: [
                    { label: "Ver segmentos", href: "/clientes/segmentos" },
                    { label: "Crear segmento", href: "/clientes/segmentos/nuevo" }
                ]
            }
        ]
    },
    {
        id: "reportes",
        label: "Reportes",
        icon: "bi-bar-chart",
        subModules: [
            {
                label: "Ventas",
                icon: "bi-graph-up",
                options: [
                    { label: "Resumen diario", href: "/reportes/ventas/diario" },
                    { label: "Resumen mensual", href: "/reportes/ventas/mensual" },
                    { label: "Por producto", href: "/reportes/ventas/producto" }
                ]
            },
            {
                label: "Inventario",
                icon: "bi-clipboard-data",
                options: [
                    { label: "Stock actual", href: "/reportes/inventario/stock" },
                    { label: "Movimientos", href: "/reportes/inventario/movimientos" }
                ]
            },
            {
                label: "Financiero",
                icon: "bi-cash-stack",
                options: [
                    { label: "Ingresos", href: "/reportes/financiero/ingresos" },
                    { label: "Gastos", href: "/reportes/financiero/gastos" },
                    { label: "Balance", href: "/reportes/financiero/balance" }
                ]
            }
        ]
    },
    {
        id: "facturacion",
        label: "Facturacion",
        icon: "bi-receipt",
        subModules: [
            {
                label: "Facturas",
                icon: "bi-file-earmark-text",
                options: [
                    { label: "Emitir factura", href: "/facturacion/facturas/nueva" },
                    { label: "Historial", href: "/facturacion/facturas/historial" },
                    { label: "Borradores", href: "/facturacion/facturas/borradores" }
                ]
            },
            {
                label: "Notas de credito",
                icon: "bi-file-earmark-minus",
                options: [
                    { label: "Emitir nota", href: "/facturacion/notas/nueva" },
                    { label: "Historial", href: "/facturacion/notas/historial" }
                ]
            }
        ]
    },
    {
        id: "configuracion",
        label: "Configuracion",
        icon: "bi-gear",
        subModules: [
            {
                label: "General",
                icon: "bi-sliders",
                options: [
                    { label: "Empresa", href: "/configuracion/general/empresa" },
                    { label: "Preferencias", href: "/configuracion/general/preferencias" }
                ]
            },
            {
                label: "Usuarios",
                icon: "bi-person-gear",
                options: [
                    { label: "Lista de usuarios", href: "/configuracion/usuarios/lista" },
                    { label: "Roles y permisos", href: "/configuracion/usuarios/roles" },
                    { label: "Nuevo usuario", href: "/configuracion/usuarios/nuevo" }
                ]
            }
        ]
    }
]

interface SidebarProps {
    isCollapsed: boolean
    isMobile: boolean
}

const AsideMenu = ({ isCollapsed, isMobile }: SidebarProps) => {

    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [activeSubModule, setActiveSubModule] = useState<string | null>(null)
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute("data-bs-theme")
            setIsDarkMode(theme === "dark")
        }

        checkTheme()

        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-bs-theme"]
        })

        return () => observer.disconnect()
    }, [])

    const collapsed = isMobile ? true : isCollapsed

    const sidebarBg = isDarkMode ? "#1a2332" : "#212529"
    const sidebarBorderColor = isDarkMode ? "#2d3a4f" : "#495057"

    const handleMenuClick = (item: MenuItem) => {
        if (item.href) {
            setActiveMenu(null)
            setActiveSubModule(null)
            return
        }
        if (activeMenu === item.id) {
            setActiveMenu(null)
            setActiveSubModule(null)
        } else {
            setActiveMenu(item.id)
            setActiveSubModule(null)
        }
    }

    const handleSubModuleClick = (subModuleLabel: string) => {
        if (activeSubModule === subModuleLabel) {
            setActiveSubModule(null)
        } else {
            setActiveSubModule(subModuleLabel)
        }
    }

    const activeItem = menuItems.find(item => item.id === activeMenu)

    return (
        <>
            {/* Sidebar */}
            <div
                className="d-flex flex-column text-white position-fixed h-100"
                style={{
                    width: isMobile ? '70px' : (collapsed ? '80px' : '260px'),
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                    zIndex: 1040,
                    backgroundColor: sidebarBg
                }}
            >
                {/* Logo */}
                <div
                    className="d-flex align-items-center justify-content-center  py-2 border-bottom"
                    style={{ borderColor: `${sidebarBorderColor} !important` }}
                >
                    <div
                        className="d-flex align-items-center justify-content-center bg-primary rounded"
                        style={{ width: '40px', height: '40px', minWidth: '40px' }}
                    >
                        <i className="bi bi-lightning-charge-fill text-white fs-5"></i>
                    </div>
                    {!collapsed && !isMobile && (
                        <>
                            <div>
                                <span className="ms-3 fw-semibold fs-5">{appConfig.name}</span>
                                <p className="ms-3 fw-semibold" style={{ fontSize: "10px" }}>{appConfig.description}</p>

                            </div>
                        </>
                    )}
                </div>

                {/* Menu Items */}
                <nav className="flex-grow-1 overflow-auto py-2">
                    <ul className="nav flex-column">
                        {menuItems.map((item) => (
                            <li key={item.id} className="nav-item">
                                <button
                                    onClick={() => handleMenuClick(item)}
                                    className={`nav-link text-white d-flex align-items-center justify-content-center w-100 border-0 bg-transparent px-2 py-2 ${activeMenu === item.id ? 'bg-primary bg-opacity-25' : ''
                                        }`}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    title={collapsed || isMobile ? item.label : undefined}
                                    onMouseEnter={(e) => {
                                        if (activeMenu !== item.id) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeMenu !== item.id) {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }
                                    }}
                                >
                                    <i className={`bi ${item.icon} fs-5`} style={{ width: '24px' }}></i>
                                    {!collapsed && !isMobile && (
                                        <>
                                            <span className="ms-3 flex-grow-1 text-start">{item.label}</span>
                                            {item.subModules && (
                                                <i className={`bi bi-chevron-right small`} style={{
                                                    transition: 'transform 0.2s',
                                                    transform: activeMenu === item.id ? 'rotate(90deg)' : 'rotate(0deg)'
                                                }}></i>
                                            )}
                                        </>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Section */}
                <div
                    className="border-top p-2"
                    style={{ borderColor: `${sidebarBorderColor} !important` }}
                >
                    <div className="d-flex align-items-center justify-content-center">
                        <div
                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px', minWidth: '36px' }}
                        >
                            <span className="text-white fw-medium small">{getNamesUser().shortName}</span>
                        </div>
                        {!collapsed && !isMobile && (
                            <div className="ms-3 overflow-hidden">
                                <p className="mb-0 fw-medium text-truncate" style={{ fontSize: '14px' }}>{getNamesUser().nameUser}</p>
                                <p className="mb-0 text-secondary small text-truncate">{getNameRolCurrentUser()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Submenu Panel */}
            {activeMenu && activeItem?.subModules && (
                <>
                    {/* Backdrop */}
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            zIndex: 1041
                        }}
                        onClick={() => {
                            setActiveMenu(null)
                            setActiveSubModule(null)
                        }}
                    />

                    {/* Floating Panel */}
                    <div
                        className="position-fixed bg-body shadow-lg rounded-3 overflow-hidden border"
                        style={{
                            left: isMobile ? '80px' : (collapsed ? '90px' : '270px'),
                            top: '80px',
                            width: isMobile ? 'calc(100vw - 100px)' : '320px',
                            maxWidth: '320px',
                            maxHeight: 'calc(100vh - 100px)',
                            zIndex: 1042,
                            animation: 'slideIn 0.2s ease-out'
                        }}
                    >
                        {/* Panel Header */}
                        <div className="d-flex align-items-center justify-content-between px-3 py-3 bg-body-secondary border-bottom">
                            <div className="d-flex align-items-center">
                                <i className={`bi ${activeItem.icon} text-primary fs-5 me-2`}></i>
                                <h6 className="mb-0 fw-semibold">{activeItem.label}</h6>
                            </div>
                            <button
                                className="btn btn-sm btn-light rounded-circle p-1"
                                onClick={() => {
                                    setActiveMenu(null)
                                    setActiveSubModule(null)
                                }}
                                style={{ width: '28px', height: '28px' }}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        </div>

                        {/* SubModules */}
                        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                            {activeItem.subModules.map((subModule) => (
                                <div key={subModule.label} className="border-bottom">
                                    <button
                                        onClick={() => handleSubModuleClick(subModule.label)}
                                        className="btn w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-0 border-0"
                                        style={{ backgroundColor: activeSubModule === subModule.label ? 'var(--bs-secondary-bg)' : 'transparent' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <i className={`bi ${subModule.icon} text-secondary me-2`}></i>
                                            <span className="fw-medium">{subModule.label}</span>
                                        </div>
                                        <i className={`bi bi-chevron-down small text-secondary`} style={{
                                            transition: 'transform 0.2s',
                                            transform: activeSubModule === subModule.label ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}></i>
                                    </button>

                                    {/* Options */}
                                    <div style={{
                                        maxHeight: activeSubModule === subModule.label ? '300px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.3s ease'
                                    }}>
                                        <div className="bg-body-tertiary">
                                            {subModule.options.map((option) => (
                                                <a
                                                    key={option.href}
                                                    href={option.href}
                                                    className="d-flex align-items-center px-4 py-2 text-decoration-none text-body"
                                                    style={{
                                                        fontSize: '14px',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bs-secondary-bg)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <span className="border-start border-2 border-primary ps-3">{option.label}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default AsideMenu;
