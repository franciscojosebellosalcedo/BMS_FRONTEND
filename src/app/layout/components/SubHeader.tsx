import { useMemo, type FC } from "react";
import { useLocation } from "react-router-dom";
import { LABELS } from "../utils/label.breadcrumb";
import { useAppSelector } from "../../store/hooks";
import { ROUTES } from "../../utils/menu/appRoutes";

type Props = {
    isSidebarCollapsed: boolean,
    isMobile: boolean,
}

const SubHeader: FC<Props> = ({
    isSidebarCollapsed,
    isMobile
}) => {

    const { pathname } = useLocation();

    const componentReactNode = useAppSelector(state => state.layout.component );

    const location = useLocation();

    const getBreadcrumb = ( ) =>{

        const paths = pathname
            .split("/")
            .filter(Boolean);

        let breadcrumb = "";
        
        paths.map(( item: string, index ) =>{

            if( LABELS[item] ){

                if(index === 0 ) {
                    breadcrumb += LABELS[item]
                }else{
                    breadcrumb += " -> "+LABELS[item]
                }

            }
        })
        
        return breadcrumb;
    }

    const breadcrumb = useMemo(() => {

        return getBreadcrumb();

    }, [pathname]);

    const showComponent = () =>{

        const pathname = location.pathname;
        
        if(
            pathname.includes( ROUTES.SETTING_NEW_ROL)
        ){
            return componentReactNode
        }
        
    }

    return (
        <header
            className="bg-body border-bottom shadow-sm position-sticky top-0 d-flex align-items-center justify-content-between px-3 px-md-4"
            style={{
                height: '64px',
                marginLeft: isMobile ? '70px' : (isSidebarCollapsed ? '80px' : '260px'),
                transition: 'margin-left 0.3s ease',
                zIndex: 1000
            }}
        >
            <span className="fw-semibold text-muted">
                {breadcrumb}
            </span>

            {showComponent()}
            
        </header>
    );
}

export default SubHeader;