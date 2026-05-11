import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const commentText = comment.trim();
      if (!commentText) {
        return rejectWithValue("Comment cannot be empty");
      }

      const { data } = await axios.post(`/comments/${postId}`, {
        comment: commentText,
      });

      if (!data?._id || typeof data.comment !== "string") {
        return rejectWithValue(data?.message || "Comment was not created");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return Array.isArray(data)
        ? data.filter((comment) => comment && typeof comment.comment === "string")
        : [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getPostComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
