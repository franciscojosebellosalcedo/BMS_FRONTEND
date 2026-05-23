
import { useState } from "react"
import { getNamesUser } from "../../../shared/utils/userUtils"
import { useTheme } from "../../providers/ThemeProvider"
import Notifications from "./Notifications"
import HeaderUser from "./HeaderUser"

interface HeaderProps {
    onToggleSidebar: () => void
    isSidebarCollapsed: boolean
    isMobile: boolean
}

const Header = ({ onToggleSidebar, isSidebarCollapsed, isMobile }: HeaderProps) => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <header
                className="bg-body border-bottom shadow-sm position-sticky top-0 d-flex align-items-center justify-content-between px-3 px-md-4"
                style={{
                    height: '64px',
                    marginLeft: isMobile ? '70px' : (isSidebarCollapsed ? '80px' : '260px'),
                    transition: 'margin-left 0.3s ease',
                    zIndex: 1030
                }}
            >
                {/* Left Section */}
                <div className="d-flex align-items-center gap-2 gap-md-3">
                    {/* Solo mostrar boton de toggle en desktop */}
                    {!isMobile && (
                        <button
                            onClick={onToggleSidebar}
                            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}
                            title={isSidebarCollapsed ? "Expandir menu" : "Contraer menu"}
                        >
                            <i className={`bi ${isSidebarCollapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'} fs-5`}></i>
                        </button>
                    )}

                    {/* Search */}
                    <div className="position-relative d-none d-md-block">
                        <i className="bi bi-search position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="form-control bg-body-secondary border-0 ps-5"
                            style={{ width: '300px' }}
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="d-flex align-items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px' }}
                        title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                    >
                        <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'} fs-5`}></i>
                    </button>

                    {/* Notifications Button */}
                    <button
                        onClick={() => setShowNotifications(true)}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <i className="bi bi-bell fs-5"></i>
                        <span
                            className="position-absolute bg-danger rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{
                                width: '18px',
                                height: '18px',
                                fontSize: '10px',
                                top: '2px',
                                right: '2px'
                            }}
                        >
                            5
                        </span>
                    </button>

                    <div className="position-relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-2 py-1"
                        >
                            <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <span className="small fw-medium">{getNamesUser().shortName}</span>
                            </div>
                            <span className="d-none d-lg-inline fw-medium">{getNamesUser().name}</span>
                            <i className="bi bi-chevron-down small d-none d-lg-inline"></i>
                        </button>

                        {showUserMenu && (

                            <HeaderUser 
                                setShowUserMenu = { setShowUserMenu }
                            />

                        )}
                    </div>
                </div>
            </header>

            <Notifications
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </>
    )
}

export default Header
