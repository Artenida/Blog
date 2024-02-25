import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";
import { useNavigate } from "react-router-dom";

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
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type RegisterUserResponse = {
  data: any; // Define the type based on your actual response data
  error?: string; // Optional error message
};

export const registerUser = createAsyncThunk<RegisterUserResponse, UserBodyTypeRegister>(
  'api/auth/register',
  async (body: UserBodyTypeRegister, { rejectWithValue }) => {
    try {
      const response = await createAPI('api/auth/register', { method: 'POST' })(body);
      if (response.status === 201) {
        const data = await response.json();
        return data;
      } else {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

