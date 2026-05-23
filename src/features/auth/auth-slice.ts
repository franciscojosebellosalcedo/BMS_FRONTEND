import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TUser } from "../../modules/auth/types"
import { setItemLocalStorage } from "../../shared/utils/localStorage-utils"
import { TEXT_REFRESS_TOKEN } from "../../constants/auth-constant"
import type { TRol } from "../../modules/settings/roles/types"

interface AuthState {
    user: TUser | null
    rol: TRol | null
    accessToken: string | null
    refressToken: string | null
}

const initialState: AuthState = {
    user: null,
    rol : null,
    refressToken: null,
    accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: TUser, rol: TRol, accessToken: string, refressToken: string }>) => {
            state.user = action.payload.user
            state.rol = action.payload.rol
            state.refressToken = action.payload.refressToken;
            state.accessToken = action.payload.accessToken
        },
        logout: (state) => {
            state.user = null
            state.rol = null
            state.refressToken = null
            state.accessToken = null

            setItemLocalStorage(TEXT_REFRESS_TOKEN, "");

        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;