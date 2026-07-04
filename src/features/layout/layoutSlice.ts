import type { ReactNode } from "react";
import type { TMenu } from "../../app/layout/types/menu.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
    menu: TMenu[],
    component: ReactNode | null
}

const initialState: LayoutState = {
    component: null,
    menu: []
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {

        setMenu: (state, action: PayloadAction<TMenu[]> ) =>{
            state.menu = action.payload;
        },

        setComponent: ( state, action: PayloadAction<ReactNode | null> ) =>{
            state.component = action.payload;
        }

    }
});

export const { setMenu , setComponent} = layoutSlice.actions;
export default layoutSlice.reducer;