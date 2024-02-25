import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";
import { json } from "stream/consumers";

type UserBodyType = {
    username: string;
    password: string;
}

type UserBodyTypeRegister = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

interface UserState {
  currentUser: any;
  loading: boolean;
  error: string | null;
  token: any;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
  token: null,
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  'api/auth/login',
  async (body: UserBodyType, { rejectWithValue }) => {
    try {
      const response = await createAPI('api/auth/login', { method: 'POST' })(body);
      const data = await response.json();
      return !response.ok ? rejectWithValue(data.message) : data.user[0];
    } catch (error: any) {
      return rejectWithValue(error); // Pass error response data to reducer
    }
  }
);

export const registerUser = createAsyncThunk(
  'api/auth/register',
  async (body: UserBodyTypeRegister, { dispatch, rejectWithValue }) => {
    try {
      // Assuming createAPI returns a promise that resolves with a response object
      const response = await createAPI('api/auth/register', { method: 'POST' })(body);
      if( response.ok ) {
        const loginFields = {
          username: body.username,
          password: body.password,
        }

        dispatch(loginUser(loginFields))
      } else {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
    } catch (error) {
    }
  }
);

