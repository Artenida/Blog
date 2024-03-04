import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI, deleteAPI } from "../utils/api/createApi";

type UserBodyType = {
  username: string;
  password: string;
};

type UserBodyTypeRegister = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

type UserBodyTypeUpdate = {
  username: string;
  email: string;
  bio: string;
  userId: number;
};

export const loginUser = createAsyncThunk(
  "api/auth/login",
  async (body: UserBodyType, { rejectWithValue }) => {
    try {
      const response = await createAPI("api/auth/login", { method: "POST" })(
        body
      );
      const data = await response.json();
      // console.log(data);
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type RegisterUserResponse = {
  data: any;
  error?: string;
};

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  UserBodyTypeRegister
>(
  "api/auth/register",
  async (body: UserBodyTypeRegister, { rejectWithValue }) => {
    try {
      const response = await createAPI("api/auth/register", { method: "POST" })(
        body
      );
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

// type UserBodyTypeDelete = {
//   userId: number;
// };

// export const deleteUser = createAsyncThunk(
//   "api/users/delete",
//   async (body: UserBodyTypeDelete, { rejectWithValue }) => {
//     try {
//       const { userId } = body;

//       const response = await createAPI<{}>(`api/users/delete/${userId}`, {
//         method: "DELETE",
//       })(body);

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         return rejectWithValue(errorMessage);
//       }

//       return { success: true };
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const deleteUser = createAsyncThunk(
  "api/users/delete",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await deleteAPI(`api/users/delete/${userId}`, {
        method: "DELETE",
      })();
      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage);
      }
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "api/users/update",
  async (body: UserBodyTypeUpdate, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/users/update/${body.userId}`, {
        method: "PUT",
        body: JSON.stringify(body),
      })(body);
      const data = await response.json();
      console.log(data);
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
