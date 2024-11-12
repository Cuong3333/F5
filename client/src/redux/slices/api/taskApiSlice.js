import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStarts: builder.query({
            query: () => ({
                url: `/tasks`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ['Task'],  // Cung cấp tag "Task"
        }),

        createTask: builder.mutation({
            query: (data) => ({
                url: `/create_tasks`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Task'],  // Làm mới dữ liệu task sau khi tạo
        }),

        updateTask: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/update_tasks/${id}`,  // Gắn id vào URL
                method: "PUT",
                body: data,  // Truyền data chứa thông tin cần cập nhật
                credentials: "include",
            }),
            invalidatesTags: ['Task'],  // Làm mới dữ liệu task sau khi cập nhật
        }),

        deleteTask: builder.mutation({
            // Nhận `id` từ tham số và gắn vào URL
            query: (id) => ({
                url: `/delete_tasks/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['Task'],  // Làm mới dữ liệu task sau khi xóa
        }),
    }),
    
    tagTypes: ['Task'],  // Định nghĩa tag "Task"
});





export const { useGetDashboardStartsQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApiSlice;
