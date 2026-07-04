import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { setItemLocalStorage } from "../../shared/utils/localStorageUtils"
import { TEXT_REFRESS_TOKEN } from "../../constants/authConstant"
import type { TRol } from "../../modules/settings/roles/types/rolType"
import type { TUser } from "../../modules/auth/types/userType"
import type { TUserPermission } from "../../modules/auth/types/userPermissionType"

interface AuthState {
    user: TUser | null
    rol: TRol | null
    permissions: TUserPermission[],
    accessToken: string | null
    refressToken: string | null
}

const initialState: AuthState = {
    user: null,
    rol : null,
    permissions: [],
    refressToken: null,
    accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: TUser, rol: TRol, accessToken: string, refressToken: string, permissions: TUserPermission[] }>) => {
            state.user = action.payload.user
            state.rol = action.payload.rol
            state.permissions = action.payload.permissions;
            state.refressToken = action.payload.refressToken;
            state.accessToken = action.payload.accessToken
        },
        logout: (state) => {
            state.user = null
            state.rol = null
            state.permissions = []
            state.refressToken = null
            state.accessToken = null

            setItemLocalStorage(TEXT_REFRESS_TOKEN, "");

        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;