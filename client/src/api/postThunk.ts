import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";
import { RootState } from "../store/store";

type UserEndpointType = {
  token?: string;
  userId: string
}

export const retrieveAllPosts = createAsyncThunk(
  "posts/posts/allPosts",
  async () => {
    try {
      const response = await createAPI("api/posts/allPosts", {
        method: "GET",
      })();
      const post = await response.json();
      return post;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "api/posts/getSinglePost",
  async (postId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/posts/getSinglePost/${postId}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve single post");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMyPosts = createAsyncThunk(
  "api/posts/user",
  async ({ userId }: UserEndpointType, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? '';

      const response = await createAPI(`api/posts/user/${userId}`, {
        method: "GET",
        token: token,
      })();

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching data:', errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error('Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "api/posts/delete",
  async (userId: number, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? '';
      const response = await createAPI(`api/posts/delete/${userId}`, {
        method: "DELETE",
        token: token,
      })(null);
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