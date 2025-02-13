import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionState {
    signedIn: boolean,
    signedInSSO: boolean,
    token: string | null,
    refreshToken: string | null
}

const initialState: SessionState = {
    signedIn: false,
    signedInSSO: false,
    token: null,
    refreshToken: null
}

const sessionSlice = createSlice({
    name: 'auth-session',
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<{ token: string, refreshToken: string, isSignInSSO?: boolean }>) {
            state.signedIn = true,
            state.signedInSSO = action.payload.isSignInSSO || false,
            state.token = action.payload.token,
            state.refreshToken = action.payload.refreshToken
        },
        signOutSuccess(state) {
            state.signedIn = false,
            state.signedInSSO = false,
            state.token = null,
            state.refreshToken = null
        },
    },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions;
export default sessionSlice.reducer;
