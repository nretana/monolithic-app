import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BaseState = {
    currentRouteKey: string
}

export const initialState: BaseState = {
    currentRouteKey: '',
}

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload
        },
    },
})

export const { setCurrentRouteKey } = baseSlice.actions;

export default baseSlice.reducer;
