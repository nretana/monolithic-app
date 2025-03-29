import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@/modules/core/configs/theme.config'


export type ThemeState = {
    sideNavCollapse: boolean
}

const initialState: ThemeState = {
    sideNavCollapse: themeConfig.sideNavCollapse
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSideNavCollapse: (state: ThemeState, action: PayloadAction<boolean>) => {
            state.sideNavCollapse = action.payload;
        }
    },
})

export const { setSideNavCollapse } = themeSlice.actions;

export default themeSlice.reducer;
