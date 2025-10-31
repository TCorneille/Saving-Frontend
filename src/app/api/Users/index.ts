import { apiSlice } from "../../apiEntry";

// Get base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/users`,
        method: "GET",
      }),
    }),

    // Create / Signup user
    createUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/users/signup`,
        method: "POST",
        body: data,
      }),
    }),

    // Login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/users/login`,
        method: "POST",
        body: data,
      }),
    }),

    // Delete user by ID
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export RTK Query hooks
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
} = userApi;
