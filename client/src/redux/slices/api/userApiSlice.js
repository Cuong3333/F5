import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({ // call Update
            query: (data) => ({
              url: `/profile`,
              method: "PUT",
              body: data, // Dữ liệu JSON
              credentials: "include",
            }),
          }),   
  
          // ========== GET +++++=====
        // Query để lấy danh sách thành viên của đội
        getTeamList: builder.query({
            query: () => ({
            url: `/my_team`,           // Đường dẫn API để lấy danh sách đội
            method: "GET",             // Phương thức GET
            }),
        }), 

        // ============== DELETE =+=================
        deleteUser: builder.mutation({
            query: (id) => ({
            url: `/team/${id}`,           
            method: "DELETE",            
            }),
        }), 
    }),
  });

export const{useUpdateUserMutation, useGetTeamListQuery, useDeleteUserMutation}  = userApiSlice