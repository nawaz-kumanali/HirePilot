import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice'
import userMenuReducer from './UserMenu/usermenu.slice'
import currentUserReducer from './CurrentUser/currentuser.slice'

export const rootReducer = combineReducers({
    auth: authReducer,
    userMenu: userMenuReducer,
    currentUser: currentUserReducer

})

export type RootState = ReturnType<typeof rootReducer>