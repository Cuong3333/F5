// F5/client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Quản lý thông tin người dùng
import { apiSlice } from "./slices/apiSlice";
import communityReducer from "./slices/communitySlice"; // Thêm communitySlice vào store

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    community: communityReducer, // Thêm community reducer để quản lý trạng thái Community
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
