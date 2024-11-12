import { apiSlice } from "../apiSlice";

export const menuApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ===================== GET Menu =====================
        getMenu: builder.query({
            query: () => ({
                url: `/get_menu`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ['Menu'],
        }),
    }),
    
    tagTypes: ['Menu'],  // Định nghĩa tag "Task"
});

export const { useGetMenuQuery } = menuApiSlice;

