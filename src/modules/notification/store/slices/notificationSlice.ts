import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NotificationState = {
    name: string,
    lastName: string
}

const initialState: NotificationState = {
    name: 'init name',
    lastName: 'init lastName'
}

const notificationSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        setNewNotification: (state, action: PayloadAction<NotificationState>) => {
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
        }
    }
});

export const { setNewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
