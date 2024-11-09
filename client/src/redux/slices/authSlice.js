import { createSlice } from "@reduxjs/toolkit";

// Lấy token từ localStorage khi khởi tạo state
const initialState = {
  token: localStorage.getItem("access_token") || null, // Kiểm tra token trong localStorage
  user: JSON.parse(localStorage.getItem("user")) || null,
  isSidebarOpen: false, // Trạng thái ban đầu của sidebar
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;  // Lưu token vào state
      state.user = action.payload.user;    // Lưu thông tin người dùng vào state
      // Lưu token và user vào localStorage
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));  // Lưu thông tin người dùng vào localStorage
    },
    logout: (state) => {
      state.token = null;  // Xóa token khỏi state
      state.user = null;   // Xóa thông tin người dùng khỏi state
      localStorage.removeItem("access_token");  // Xóa token khỏi localStorage
      localStorage.removeItem("user");          // Xóa thông tin người dùng khỏi localStorage

    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;  // Cập nhật trạng thái của sidebar
    },
  },
});

// Xuất các actions và reducer
export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;
