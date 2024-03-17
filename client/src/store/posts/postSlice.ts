import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import {
  deletePost,
  getMyPosts,
  getSinglePost,
  retrieveAllAuthors,
  retrieveAllPosts,
  retrievePostTags,
} from "../../api/postThunk";
import { retrieveAllTags } from "../../api/tagsThunk";
interface Post {
  postId: string;
  title: string;
  description: string;
  createdAt: Date | undefined;
  image: string;
  tags: Tag[];
}

interface Tag {
  tagId: number;
  name: string;
}

interface User {
  userId: string;
  username: string;
  profile_picture: string;
}

interface BlogType {
  user: User;
  posts: Post[];
}
interface BlogPost {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface PostState {
  currentPost: [] | null;
  currentAuthor: [] | null;
  postTags: [] | null;
  loading: boolean;
  successful: boolean;
  retrieveError: string | null;
  deleteError: string | null;
  deleteSuccessful: string | null;
  isUpdated: boolean;
  post: BlogType;
  myPost: BlogPost;
}

const initialState: PostState = {
  currentPost: [],
  currentAuthor: [],
  postTags: [],
  retrieveError: null,
  deleteError: null,
  deleteSuccessful: null,
  loading: false,
  successful: false,
  isUpdated: false,
  myPost: {
    id: "",
    title: "",
    description: "",
    createdAt: "",
  },
  post: {
    user: {
      userId: "",
      username: "",
      profile_picture: "",
    },
    posts: [
      {
        postId: "",
        title: "",
        description: "",
        createdAt: undefined,
        image: "",
        tags: [],
      },
    ],
  },
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
      })
      .addCase(getSinglePost.fulfilled, (state: PostState, action: any) => {
        state.retrieveError = null;
        state.loading = false;
        state.post = action.payload.data;
      })
      .addCase(getSinglePost.rejected, (state: PostState, action: any) => {
        state.retrieveError = action.payload as string;
        state.loading = false;
        state.post = initialState.post;
      })
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPost = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteError = null;
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteError = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload as string;
      })
      .addCase(retrieveAllAuthors.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.currentAuthor = action.payload.data;
      })
      .addCase(retrieveAllAuthors.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })
      .addCase(retrievePostTags.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrievePostTags.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.postTags = action.payload;
      })
      .addCase(retrievePostTags.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      });
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;