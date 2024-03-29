import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import {
  createPost,
  deletePost,
  getMyPosts,
  getNrOfPosts,
  getSinglePost,
  retrieveAllAuthors,
  retrieveAllPosts,
  retrievePaginatedPosts,
  retrievePostTags,
  updatePost,
} from "../../api/postThunk";

interface Post {
  postId: string;
  title: string;
  description: string;
  createdAt: Date;
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
  createdAt: Date;
}
interface Image {
url: string;
}
interface Tag {
  id: number;
  name: string;
}
interface Paginated {
  id: string;
  images: Image[]; 
  title: string;
  tags: Tag[];
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
}
interface PaginatedPosts {
  data: {
    next?: { pageAsNumber: number };
    prev?: { pageAsNumber: number };
    result: Paginated[];
    totalUser?: number;
    pageCount?: number;
  };
}

interface PostState {
  currentPost: [] | null;
  paginatedPost: PaginatedPosts | null;
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
  postNr: number | null;
}

const initialState: PostState = {
  currentPost: [],
  paginatedPost: null,
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
  postNr: null,
  myPost: {
    id: "",
    title: "",
    description: "",
    createdAt: new Date(),
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
        createdAt: new Date(),
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

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.createError = null;
        state.successful = true;
      })
      .addCase(createPost.rejected, (state, action) => {
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

      .addCase(getNrOfPosts.fulfilled, (state, action) => {
        state.postNr = action.payload;
      })
      .addCase(getNrOfPosts.rejected, (state, action) => {
        state.postNr = null;
      })

      .addCase(retrievePaginatedPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrievePaginatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.paginatedPost = action.payload.data;
      })           
      .addCase(retrievePaginatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
