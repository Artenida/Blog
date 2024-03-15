import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { getMyPosts, getSinglePost, retrieveAllPosts } from "../../api/postThunk";

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
  post: Post[];
}
interface BlogPost {
  id: string ;
  title: string;
  description: string;
  createdAt: string;
}

interface PostState {
  currentPost: [];
  loading: boolean;
  successful: boolean;
  retrieveError: string | null;
  isUpdated: boolean;
  post: BlogType;
  myPost: BlogPost;
}

const initialState: PostState = {
  currentPost: [],
  retrieveError: null,
  loading: false,
  successful: false,
  isUpdated: false,
  myPost: {
    id: "",
    title: '',
    description: '',
    createdAt: ''
  },
  post: {
    user: 
      {
        userId: "",
        username: "",
        profile_picture: "",
      },
    post: [
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
        // state.post = initialState.post;
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
      });
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
