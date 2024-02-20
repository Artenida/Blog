import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { login } from "../../api/user";

interface UserState {
    currentUser: any; // Define the type for currentUser
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action: PayloadAction<UserState>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<UserState>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
        })
    },
});

export const { signInStart, signInSuccess, signInFailure, registerFailure, registerStart, registerSuccess } = userSlice.actions; 
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer;
