import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/modules/auth/@auth-types/userInfo';
import { ADMIN } from '@/modules/core/constants/roles.constants';

export type UserState = UserInfo;

const initialState: UserState = {
    avatar: '',
    name: '',
    username: '',
    email: '',
    authority: [ADMIN],
}

const userSlice = createSlice({
    name: 'auth-user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.username = action.payload?.username
            state.authority = action.payload?.authority
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
