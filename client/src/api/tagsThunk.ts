import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/api/createApi";

  export const retrieveAllTags = createAsyncThunk(
    "posts/tags/getTags",
    async () => {
      try {
        const response = await createAPI("api/tags/getTags", {
          method: "GET",
        })();
        const post = await response.json();
        return post;
      } catch (error: any) {
        return error.message;
      }
    }
  );