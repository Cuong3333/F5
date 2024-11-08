//authSlice (authSlice) chịu trách nhiệm quản lý trạng thái người dùng (như dữ liệu người dùng và trạng thái sidebar). Nó theo dõi người dùng hiện tại, lưu thông tin đăng nhập vào localStorage và cung cấp các actions để đăng nhập, đăng xuất và thay đổi trạng thái sidebar.
import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : user,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { // lưu thông tin người dùng vào local để vẫn đăng nhập lần sau khi làm mới trang
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => { // dùng để đăng suất xóa user ra khỏi local đặt user thành null
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => { // dùng để thay đổi trang thái của sileBar mở hay đóng
      state.isSidebarOpen = action.payload;
    },
  },
});

//Các action creators như setCredentials, logout, và setOpenSidebar được tạo tự động bởi createSlice. Các action này có thể được gọi trong các component để thay đổi trạng thái của Redux.
export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
