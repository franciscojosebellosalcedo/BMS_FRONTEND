
import { useState, useEffect } from "react"
import Header from "./Header"
import { ThemeProvider } from "../../providers/ThemeProvider"
import AsideMenu from "./AsideMenu"
import SubHeader from "./SubHeader"
import { Outlet } from "react-router-dom"


export function MainLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) {
                setIsSidebarCollapsed(true)
            }
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleToggleSidebar = () => {
        if (!isMobile) {
            setIsSidebarCollapsed(!isSidebarCollapsed)
        }
    }

    return (
        <ThemeProvider>
            <div className="min-vh-100 bg-body">
                <AsideMenu isCollapsed={isSidebarCollapsed} isMobile={isMobile} />
                <Header
                    onToggleSidebar={handleToggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                />
                <SubHeader/>
                <main
                    style={{
                        marginLeft: isMobile ? '70px' : (isSidebarCollapsed ? '80px' : '260px'),
                        transition: 'margin-left 0.3s ease',
                        padding: '24px'
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}
