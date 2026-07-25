import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TRol } from "../../modules/settings/roles/types/rolType";

type RolState = {
    data: {
        list: TRol[],
        paginated: TRol[]
    }
}

const initialState: RolState = {
    data: {
        list: [],
        paginated: []
    }
}

const rolSlice = createSlice({
    name: "rols",
    initialState,
    reducers: {

        setRolPaginated: ( state, action: PayloadAction<TRol[]>) =>{
            state.data.paginated = action.payload;
        },

        setRolList: ( state, action: PayloadAction<TRol[]>) =>{
            state.data.list = action.payload;
        },

        addRol: ( state, action: PayloadAction<TRol>) =>{
            state.data.list.push( action.payload );
        },

        updateRolById : (state, action: PayloadAction<TRol>) =>{

            const indexList = state.data.list.findIndex(( rol )=> rol.rol_Id === action.payload.rol_Id );
            const indexPaginated = state.data.paginated.findIndex(( rol )=> rol.rol_Id === action.payload.rol_Id );

            if( indexList ){
                state.data.list[indexList] = action.payload;
            }

            if( indexPaginated ){
                state.data.paginated[indexPaginated] = action.payload;
            }
        }

    }
});

export const { setRolList, setRolPaginated, updateRolById, addRol } = rolSlice.actions; 
export default rolSlice.reducer;