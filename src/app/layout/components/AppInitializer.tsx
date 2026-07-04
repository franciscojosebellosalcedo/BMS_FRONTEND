import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setMenu } from "../../../features/layout/layoutSlice";
import { useAppDispatch } from "../../store/hooks";
import { menuApi } from "../api/menu.api";
import type { TMenu } from "../types/menu.type";

const AppInitializer = () => {

    const dispatch = useAppDispatch();

    const getMenu = async (): Promise<TMenu[]> => {
        const response = await menuApi.getMenu();
        return response.data;
    }

    const fetchData = async () => {

        try {

            const [
                menu
            ] = await Promise.all([
                getMenu()
            ]);

            dispatch(setMenu( menu ) );

        } catch (error) {

            console.log(error);
            
        }
    }

    useEffect(() => {

        fetchData();

    }, []);

    return (
        <Outlet />
    )
}

export default AppInitializer;