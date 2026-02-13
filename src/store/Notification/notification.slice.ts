import { createSlice } from "@reduxjs/toolkit"
import { notificationsData } from "../../data/notificationsData"

const initialState = {
    notifications: notificationsData,
    unreadNotificationCount: notificationsData.filter(n => !n.isRead).length,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notifications = action.payload
        },
        clearNotification: (state) => {
            state.notifications = [];
            state.unreadNotificationCount = 0;
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map(n => n.id === action.payload ? { ...n, isRead: true } : n)
            state.unreadNotificationCount = state.unreadNotificationCount - 1
        },
        markAsUnread: (state, action) => {
            state.notifications = state.notifications.map(n => n.id === action.payload ? { ...n, isRead: false } : n)
            state.unreadNotificationCount = state.unreadNotificationCount + 1
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload)
            state.unreadNotificationCount = state.unreadNotificationCount - 1
        },
        markAllAsRead: (state) => {
            state.notifications = state.notifications.map(n => ({ ...n, isRead: true }))
            state.unreadNotificationCount = 0
        },
        addNotification: (state, action) => {
            state.notifications = [action.payload, ...state.notifications]
            state.unreadNotificationCount = state.unreadNotificationCount + 1
        }
    }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice.reducer