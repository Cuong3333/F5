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
  }),
});

export const { useLoginMutation } = authApiSlice;
