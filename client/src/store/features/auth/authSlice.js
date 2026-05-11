import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/me");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getErrorMessage = (payload) =>
  typeof payload === "string" ? payload : payload?.message || "Request failed";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || null;
        state.user = action.payload?.user || action.payload?.newUser || null;
        state.token = action.payload?.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = getErrorMessage(action.payload);
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || null;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = getErrorMessage(action.payload);
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = getErrorMessage(action.payload);
        state.isLoading = false;
      });
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
