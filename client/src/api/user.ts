import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";

type UserBodyType = {
    username: string;
    password: string;
}

export const login = createAsyncThunk(
  'login',
  async (body: UserBodyType) => {
    try {
      const response = await createAPI('login', { method: 'POST' })(body);
      return response.json();
    } catch (error) {
    }
  },
);
