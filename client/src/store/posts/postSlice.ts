import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import {
  createBlog,
  deletePost,
  getMyPosts,
  getSinglePost,
  retrieveAllAuthors,
  retrieveAllPosts,
  retrievePostTags,
  updatePost,
} from "../../api/postThunk";

interface Post {
  postId: string;
  title: string;
  description: string;
  createdAt: Date | undefined;
  tags: Tag[];
  images: string[];
}

interface Tag {
  tagId: string;
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
  successfulUpdate: boolean;
  retrieveError: string | null;
  deleteError: string | null;
  createError: string | null;
  updateError: string | null;
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
  updateError: null,
  deleteSuccessful: null,
  createError: null,
  loading: false,
  successful: false,
  successfulUpdate: false,
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
        tags: [],
        images: [],
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
      })

      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.createError = null;
        state.successful = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload as string;
        state.successful = false;
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.successfulUpdate = true;
        state.updateError = null;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.successfulUpdate = false;
        state.loading = false;
        state.updateError = action.payload as string;
      })
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
