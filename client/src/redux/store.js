// lưu trữ dữ liệu toàn cục ko phải truyền dữ liệu qua pops
// quản lý thông tin, trạng thái người dùng, slidebar, yeue cầu api , sử lý bất đồng bộ
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: { // phần này quản lý api, quản lý trạng thái người dùng lưu thông tin...
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => // sử lý bất đồng bộ...
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
