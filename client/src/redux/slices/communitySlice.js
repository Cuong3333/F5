// F5/client/src/redux/slices/communitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk để lấy bài đăng từ API
export const fetchPosts = createAsyncThunk("community/fetchPosts", async () => {
  const response = await axios.get("/api/posts"); // Đường dẫn API để lấy bài đăng
  return response.data;
});

const communitySlice = createSlice({
  name: "community",
  initialState: {
    posts: [],
    status: "idle", // Trạng thái có thể là 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Reducers bổ sung nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default communitySlice.reducer;
