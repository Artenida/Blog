import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";

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

export const loginUser = createAsyncThunk(
  'api/auth/login',
  async (body: UserBodyType, { rejectWithValue }) => {
    try {
      const response = await createAPI('api/auth/login', { method: 'POST' })(body);
      // return response.json();
      const data = await response.json();
      console.log(data);
      console.log(data.user);
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'api/auth/register',
  async (body: UserBodyTypeRegister, { rejectWithValue }) => {
    try {
      const response = await createAPI('api/auth/register', { method: 'POST' })(body);
      const data = await response.json();
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

