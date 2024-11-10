import Registerr from "../../../pages/Register";
import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: new URLSearchParams(data).toString(), // Chuyển data thành URLSearchParams
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Đặt header Content-Type
        },
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data, // Dữ liệu JSON
        credentials: "include",
      }),
    }),    

    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        credentials: "include",  // Đảm bảo gửi cookie kèm theo yêu cầu (nếu có)
      }),
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
