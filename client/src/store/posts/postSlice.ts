import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { retrieveAllPosts } from "../../api/postThunk";

interface BlogPost {
  id: number;
  image: string | undefined;
  title: string;
  description: string;
  createdAt: string;
}

interface PostState {
  currentPost: BlogPost[];
  loading: boolean;
  retrieveError: string | null;
  isUpdated: boolean;
}

const initialState: PostState = {
  currentPost: [],
  retrieveError: null,
  loading: false,
  isUpdated: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(retrieveAllPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.currentPost = action.payload.data;
      })
      .addCase(retrieveAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      });
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
