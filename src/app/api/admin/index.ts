import { apiSlice } from "../../apiEntry";

const BASE_URL = import.meta.env.VITE_API_URL;

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/admin/customers`,
        method: "GET",
      }),
    }),

    getBalances: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/admin/balances`,
        method: "GET",
      }),
    }),

    getStats: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/admin/stats`,
        method: "GET",
      }),
    }),
  }),
});

// Export admin hooks
export const {
  useGetCustomersQuery,
  useGetBalancesQuery,
  useGetStatsQuery,
} = adminApi;
