import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";

export const retrieveAllPosts = createAsyncThunk(
  "posts/retrieveAll",
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
