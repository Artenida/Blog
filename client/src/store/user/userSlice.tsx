import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { loginUser } from "../../api/user";
import { registerUser } from "../../api/user";
interface UserState {
  currentUser: any; // Define the type for currentUser
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  token: any;
  isLoggedIn: boolean; // Define the 'isLoggedIn' property
}

const initialState: UserState = {
  currentUser: null,
  loginError: null,
  registerError: null,
  loading: false,
  token: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutSuccess: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.loginError = null;
      state.loading = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.loginError = null;
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload as string;
      })
  },
});

export const { signOutSuccess } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
