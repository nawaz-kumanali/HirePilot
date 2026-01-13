import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CurrentUserState } from "./currentuser.types"

const initialState: CurrentUserState = {
    firstName: 'Nawaz',
    lastName: 'Kumanali',
    headline: 'Full Stack Developer | Open Source Enthusiast',
    location: 'Nipani, India',
    email: 'iamnawazahmad777@gmail.com',
    phone: '+91 8217097121',
    bio: 'Passionate about building scalable applications and mentoring junior developers. Love exploring new technologies and contributing to open source projects.',
    website: '',
    joinedDate: 'Joined March 2021',
    linkedin: 'https://linkedin.com/in/nawaj-kumanali',
    github: 'https://github.com/nawaz-kumanali',
    twitter: 'https://twitter.com/nawaz_kumanali',

}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (
            state,
            action: PayloadAction<Partial<CurrentUserState>>
        ) => {
            Object.assign(state, action.payload)
        },

        resetCurrentUser: () => initialState
    }
})

export const currentUserActions = currentUserSlice.actions
export default currentUserSlice.reducer
