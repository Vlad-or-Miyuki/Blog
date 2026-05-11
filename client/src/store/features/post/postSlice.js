import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/posts");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedPost, { rejectWithValue }) => {
    try {
      const postId = updatedPost.get("id");
      const { data } = await axios.put(`/posts/${postId}`, updatedPost);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/posts/${id}/like`);
      if (!data?.post?._id) {
        return rejectWithValue(data?.message || "Like was not updated");
      }

      return data.post;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const updatePostInList = (list, updatedPost) =>
  list.map((post) => (post._id === updatedPost._id ? updatedPost : post));

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?._id) {
          state.posts.push(action.payload);
        }
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts || [];
        state.popularPosts = action.payload?.popularPosts || [];
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
      })
      .addCase(removePost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload?._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (!action.payload?._id) return;

        state.posts = updatePostInList(state.posts, action.payload);
        state.popularPosts = updatePostInList(state.popularPosts, action.payload);
      });
  },
});

export default postSlice.reducer;
