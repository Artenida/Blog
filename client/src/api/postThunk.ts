import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";
import { RootState } from "../store/store";

type UserEndpointType = {
  token?: string;
  userId: string;
};

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
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/posts/user/${userId}`, {
        method: "GET",
        token: token,
      })();

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching data:", errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "api/posts/delete",
  async (postId: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/posts/delete/${postId}`, {
        method: "DELETE",
        token: token,
      })();

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching data:", errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const retrieveAllAuthors = createAsyncThunk(
  "posts/posts/authors",
  async () => {
    try {
      const response = await createAPI("api/posts/authors", {
        method: "GET",
      })();
      const post = await response.json();
      return post;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const retrievePostTags = createAsyncThunk(
  "posts/posts/tags",
  async (postId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/posts/tags/${postId}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve tags");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface BlogInfo {
  formData: FormData;
}

type CreatePost = {
  title: string;
  description: string;
  user_id: string;
  tags: string[];
  files: FileList | [];
};

export const createBlog = createAsyncThunk(
  "api/posts/createPost",
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/posts/createPost`, {
        method: "POST",
        token: token,
      })(formData);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating post:", errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
