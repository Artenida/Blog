import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { deleteUser, loginUser, updateUser } from "../../api/userThunk";
import { registerUser } from "../../api/userThunk";
interface UserState {
  currentUser: any; // Define the type for currentUser
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  deleteError: string | null;
  updateError: string | null;
  token: any;
  isLoggedIn: boolean;
  isUpdated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loginError: null,
  registerError: null,
  deleteError: null,
  updateError: null,
  loading: false,
  token: null,
  isLoggedIn: false,
  isUpdated: false,
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
    },
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
      .addCase(deleteUser.pending, (state) => {
        state.deleteError = null;
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.currentUser = null;
        state.deleteError = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.isUpdated = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.updateError = null;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = true;
        state.isUpdated = false;
        state.updateError = action.payload as string | null;
      });
  },
});

export const { signOutSuccess } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
