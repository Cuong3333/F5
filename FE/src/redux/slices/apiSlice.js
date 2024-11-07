//API slice (apiSlice) chịu trách nhiệm gọi API từ backend, nhưng trong đoạn mã này, chưa có endpoint nào được định nghĩa.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:8000";

const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
