import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";

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