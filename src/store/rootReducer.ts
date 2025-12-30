import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice'
import userMenuReducer from './UserMenu/usermenu.slice'

export const rootReducer = combineReducers({
    auth: authReducer,
    userMenu: userMenuReducer

})

export type RootState = ReturnType<typeof rootReducer>