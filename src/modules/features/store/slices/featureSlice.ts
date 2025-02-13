import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FeatureState = {
    name: string,
    lastName: string
}

const initialState: FeatureState = {
    name: 'init name',
    lastName: 'init lastName'
}

const featureSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        setNewFeature: (state, action: PayloadAction<FeatureState>) => {
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
        }
    }
});

export const { setNewFeature } = featureSlice.actions;
export default featureSlice.reducer;
