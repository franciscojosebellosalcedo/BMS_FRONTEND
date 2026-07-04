
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getNameRolCurrentUser } from "../../../shared/utils/rolUtils"
import { getNamesUser } from "../../../shared/utils/userUtils"
import { appConfig } from "../../app.config"
import type { TMenu, TModule, TOption, TSubmodule, TSubModuleItem } from "../types/menu.type"
import { ICONS_MODULE, ICONS_SUBMODULES } from "../utils/menu.icon.util"
import { MODULES_CODES, sortMenu } from "../utils/menu.util"
import { useAppSelector } from "../../store/hooks"
import { ENTITY_ROUTES } from "../../utils/menu/entitiesRoutes"
import { MODULE_ROUTES } from "../../utils/menu/moduleRoutes"

interface SidebarProps {
    isCollapsed: boolean
    isMobile: boolean
}

const AsideMenu = ({ isCollapsed, isMobile }: SidebarProps) => {

    const [activeMenu, setActiveMenu] = useState<number | null>(null)

    const [activeSubModule, setActiveSubModule] = useState<number | null>(null)

    const [isDarkMode, setIsDarkMode] = useState(false);

    const navigate = useNavigate();

    const menu = useAppSelector(state => state.layout.menu );

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
    }, []);

    const collapsed = isMobile ? true : isCollapsed

    const sidebarBg = isDarkMode ? "#1a2332" : "#212529"
    const sidebarBorderColor = isDarkMode ? "#2d3a4f" : "#495057"

    const getPathOption = (option: TOption, codeModule: string) => {

        const path = `${MODULE_ROUTES[ codeModule as keyof typeof MODULE_ROUTES]}/page/${ENTITY_ROUTES[option.opci_Slug as keyof typeof ENTITY_ROUTES]}`;
        return path;

    }

    const handleMenuClick = (item: TModule) => {

        if (activeMenu === item.modulo_Id) {

            setActiveMenu(null)
            setActiveSubModule(null)

        } else {

            setActiveMenu(item.modulo_Id)
            setActiveSubModule(null)
        }
    }

    const getIconModule = (module: TModule) => {
        return ICONS_MODULE[module.modulo_Codigo as keyof typeof ICONS_MODULE]
    }

    const getIconSubModule = (module: TSubmodule) => {
        return ICONS_SUBMODULES[module.submo_Codigo as keyof typeof ICONS_SUBMODULES]
    }

    const getModulesActives = ( menu: TMenu[] ) =>{
        return menu.filter((m) => m.module.modulo_Activo )
    }

    const getSubmodulesActives = (submodules: TSubModuleItem[] ) =>{
        return submodules.filter((sub) => sub.submodule.submo_Activo )
    }

    const getOptionsActives = ( options: TOption[] ) =>{
        return options.filter((opt) => opt.opci_Activo )
    }

    const handleSubModuleClick = (subModuleLabel: number) => {
        if (activeSubModule === subModuleLabel) {
            setActiveSubModule(null)
        } else {
            setActiveSubModule(subModuleLabel)
        }
    }

    const activeItem = menu.find(item => item.module.modulo_Id === activeMenu)

    return (
        <>
            <div
                className="d-flex flex-column text-white position-fixed h-100"
                style={{
                    width: isMobile ? '70px' : (collapsed ? '80px' : '260px'),
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                    zIndex: 1040,
                    backgroundColor: sidebarBg
                }}
            >
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

                <nav className="flex-grow-1 overflow-auto py-2">
                    <ul className="nav flex-column">
                        {sortMenu( getModulesActives(menu) ).map((item) => (
                            <li key={item.module.modulo_Id} className="nav-item">
                                <button
                                    onClick={() => {
                                        if (item.module.modulo_Codigo !== MODULES_CODES.INICIO) {

                                            handleMenuClick(item.module);

                                        } else {

                                            navigate("/page/dashboard");

                                        }
                                    }}
                                    className={`nav-link text-white d-flex align-items-center justify-content-center w-100 border-0 bg-transparent px-2 py-2 ${activeMenu === item.module.modulo_Id ? 'bg-primary bg-opacity-25' : ''
                                        }`}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    title={collapsed || isMobile ? item.module.modulo_Nombre : undefined}
                                    onMouseEnter={(e) => {
                                        if (activeMenu !== item.module.modulo_Id) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeMenu !== item.module.modulo_Id) {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }
                                    }}
                                >
                                    <i className={`bi ${getIconModule(item.module)} fs-5`} style={{ width: '24px' }}></i>
                                    {!collapsed && !isMobile && (
                                        <>
                                            <span className="ms-3 flex-grow-1 text-start">{item.module.modulo_Nombre}</span>
                                            {item.submodules.length && item.module.modulo_Codigo !== MODULES_CODES.INICIO && (
                                                <i className={`bi bi-chevron-right small`} style={{
                                                    transition: 'transform 0.2s',
                                                    transform: activeMenu === item.module.modulo_Id ? 'rotate(90deg)' : 'rotate(0deg)'
                                                }}></i>
                                            )}
                                        </>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

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

            {activeMenu && activeItem?.submodules && (
                <>
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
                        <div className="d-flex align-items-center justify-content-between px-3 py-3 bg-body-secondary border-bottom">
                            <div className="d-flex align-items-center">
                                <i className={`bi ${getIconModule(activeItem.module)} text-primary fs-5 me-2`}></i>
                                <h6 className="mb-0 fw-semibold">{activeItem.module.modulo_Nombre}</h6>
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

                        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                            {getSubmodulesActives(activeItem.submodules).map((item) => (
                                <div key={item.submodule.submo_Id} className="border-bottom">
                                    <button
                                        onClick={() => handleSubModuleClick(item.submodule.submo_Id)}
                                        className="btn w-100 d-flex align-items-center justify-content-between px-3 py-2 rounded-0 border-0"
                                        style={{ backgroundColor: activeSubModule === item.submodule.submo_Id ? 'var(--bs-secondary-bg)' : 'transparent' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <i className={`bi ${getIconSubModule(item.submodule)} text-secondary me-2`}></i>
                                            <span className="fw-medium">{item.submodule.submo_Nombre}</span>
                                        </div>
                                        <i className={`bi bi-chevron-down small text-secondary`} style={{
                                            transition: 'transform 0.2s',
                                            transform: activeSubModule === item.submodule.submo_Id ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}></i>
                                    </button>

                                    <div style={{
                                        maxHeight: activeSubModule === item.submodule.submo_Id ? '300px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.3s ease'
                                    }}>
                                        <div className="bg-body-tertiary">
                                            {getOptionsActives(item.options).map((option) => (
                                                <Link
                                                    onClick={() => {
                                                        setActiveMenu(null)
                                                        setActiveSubModule(null)
                                                    }}
                                                    key={option.opci_Id}
                                                    to={getPathOption(option, activeItem.module.modulo_Codigo )}
                                                    className="d-flex align-items-center px-4 py-2 text-decoration-none text-body"
                                                    style={{
                                                        fontSize: '14px',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bs-secondary-bg)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <span className="border-start border-2 border-primary ps-3">{option.opci_Nombre}</span>
                                                </Link>
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
