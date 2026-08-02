import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setMenu, setOptionsMenu } from "../../../features/layout/layoutSlice";
import { useAppDispatch } from "../../store/hooks";
import { menuApi } from "../api/menu.api";
import type { TMenu, TOption } from "../types/menu.type";

const AppInitializer = () => {

    const dispatch = useAppDispatch();

    const getMenu = async (): Promise<TMenu[]> => {
        const response = await menuApi.getMenu();
        return response.data;
    }

    const getOptionsMenu = async (): Promise<TOption[]> =>{
        const response = await menuApi.getOptions();
        return response.data;
    }

    const fetchData = async () => {

        try {

            const [
                menu, optionsMenu
            ] = await Promise.all([
                getMenu(), getOptionsMenu()
            ]);

            dispatch(setMenu( menu ) );
            dispatch(setOptionsMenu( optionsMenu ) );

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