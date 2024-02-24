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

export const login = createAsyncThunk(
  'api/auth/login',
  async (body: UserBodyType, { rejectWithValue }) => {
    try {
      const response = await createAPI('api/auth/login', { method: 'POST' })(body);
      return response.json();
    } catch (error: any) {
    }
  }
);

export const registerUser = createAsyncThunk(
  'api/auth/register',
  async (body: UserBodyTypeRegister, { rejectWithValue }) => {
    try {
      // Assuming createAPI returns a promise that resolves with a response object
      const response = await createAPI('api/auth/register', { method: 'POST' })(body);
      
      // Assuming the server returns a JSON response with user data upon successful registration
      const data = await response.json();

      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

