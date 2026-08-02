import type { ReactNode } from "react";
import type { TMenu, TOption } from "../../app/layout/types/menu.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
    menu: TMenu[];
    options: TOption[];
    component: ReactNode | null;
}

const initialState: LayoutState = {
    component: null,
    menu: [],
    options: []
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {

        setOptionsMenu: (state, action: PayloadAction<TOption[]> ) =>{
            state.options = action.payload;
        },

        setMenu: (state, action: PayloadAction<TMenu[]> ) =>{
            state.menu = action.payload;
        },

        setComponent: ( state, action: PayloadAction<ReactNode | null> ) =>{
            state.component = action.payload;
        }

    }
});

export const { setMenu , setComponent, setOptionsMenu } = layoutSlice.actions;
export default layoutSlice.reducer;