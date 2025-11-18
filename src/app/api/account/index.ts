import { apiSlice } from "../../apiEntry";

const BASE_URL = import.meta.env.VITE_API_URL;

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getTransactions: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/account/dashboard`,
        method: "GET",
      }),
      providesTags: ["Balance"],
    }),

    deposit: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/account/deposit`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Balance"],
    }),

    withdraw: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/account/withdraw`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Balance"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useDepositMutation,
  useWithdrawMutation,
} = accountApi;
