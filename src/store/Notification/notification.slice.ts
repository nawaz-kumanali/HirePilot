import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { notificationsData, type Notification } from "../../data/notificationsData"

// Mock API call function
const fetchNotificationsApi = (): Promise<Notification[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(notificationsData);
        }, 1000); // Simulate 1 second network delay
    });
};

export const fetchNotifications = createAsyncThunk(
    'notification/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchNotificationsApi();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch notifications');
        }
    }
);

interface NotificationState {
    notifications: Notification[];
    unreadNotificationCount: number;
    loading: boolean;
    error: string | null;
    hasFetched: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    unreadNotificationCount: 0,
    loading: false,
    error: null,
    hasFetched: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notifications = action.payload
            state.unreadNotificationCount = action.payload.filter((n: Notification) => !n.isRead).length
            state.hasFetched = true
        },
        clearNotification: (state) => {
            state.notifications = [];
            state.unreadNotificationCount = 0;
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map(n => n.id === action.payload ? { ...n, isRead: true } : n)
            state.unreadNotificationCount = state.notifications.filter(n => !n.isRead).length
        },
        markAsUnread: (state, action) => {
            state.notifications = state.notifications.map(n => n.id === action.payload ? { ...n, isRead: false } : n)
            state.unreadNotificationCount = state.notifications.filter(n => !n.isRead).length
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload)
            state.unreadNotificationCount = state.notifications.filter(n => !n.isRead).length
        },
        markAllAsRead: (state) => {
            state.notifications = state.notifications.map(n => ({ ...n, isRead: true }))
            state.unreadNotificationCount = 0
        },
        addNotification: (state, action) => {
            state.notifications = [action.payload, ...state.notifications]
            state.unreadNotificationCount = state.unreadNotificationCount + (action.payload.isRead ? 0 : 1)
            state.hasFetched = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
                state.unreadNotificationCount = action.payload.filter(n => !n.isRead).length;
                state.hasFetched = true;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice.reducer