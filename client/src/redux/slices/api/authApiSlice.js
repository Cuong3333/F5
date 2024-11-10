// F5/client/src/redux/slices/api/authApiSlice.js
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
        credentials: "include", // Đảm bảo cookie (nếu có) được gửi kèm theo yêu cầu
      }),
      // Xử lý kết quả trả về từ API
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // Giả sử token được trả về từ API, lưu vào localStorage
          localStorage.setItem("token", data.token); 
          // Dispatch action để cập nhật trạng thái người dùng trong Redux store nếu cần
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
