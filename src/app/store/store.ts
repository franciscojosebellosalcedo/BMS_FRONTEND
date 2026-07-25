import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../../features/auth/authSlice";
import layoutReducer from "../../features/layout/layoutSlice";
import rolReducer from "../../features/rol/rolSlice";

export const store = configureStore({
    reducer: {
        rols: rolReducer,
        layout: layoutReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["layout.component"],
                ignoredActions: ["layout/setComponent"]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;