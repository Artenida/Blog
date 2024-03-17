import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { retrieveAllTags } from "../../api/tagsThunk";

interface Tag {
  tagId: number;
  name: string;
}

interface PostState {
  tags: Tag[] | undefined;
  retrieveError: string | null;
  loading: boolean;
}

const initialState: PostState = {
  tags: [],
  retrieveError: null,
  loading: false,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(retrieveAllTags.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.tags = action.payload.data;
      })
      .addCase(retrieveAllTags.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      });
  },
});

export const selectTags = (state: RootState) => state.tags;
export default tagsSlice.reducer;
