import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transaction, SortDirection } from "@/types";
import {
  fetchTransactions,
  fetchTransactionsByOrderId,
  fetchTransactionsByOwnerId,
  fetchTransactionByTransactionId,
} from "../data/transactionData";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchTransactions: builder.query<Transaction[], void>({
      queryFn: async () => {
        try {
          const transactions = await fetchTransactions();

          return { data: transactions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of transactions",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchTransactionsByOrderId: builder.query<Transaction[], { orderId: string; sortDirection?: SortDirection }>({
      queryFn: async ({ orderId, sortDirection }) => {
        try {
          const transactions = await fetchTransactionsByOrderId(orderId, sortDirection);

          return { data: transactions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of transactions using Order ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchTransactionsByOwnerId: builder.query<Transaction[], { ownerId: string; orderId?: string; sortDirection?: SortDirection }>({
      queryFn: async ({ ownerId, orderId, sortDirection }) => {
        try {
          const transactions = await fetchTransactionsByOwnerId(ownerId, orderId, sortDirection);

          return { data: transactions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of transactions using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchTransactionByTransactionId: builder.query<Transaction | null, string>({
      queryFn: async (transactionId: string) => {
        try {
          const transaction = await fetchTransactionByTransactionId(transactionId);

          return { data: transaction };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the transaction using Transaction ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchTransactionsQuery,
  useFetchTransactionsByOrderIdQuery,
  useFetchTransactionsByOwnerIdQuery,
  useFetchTransactionByTransactionIdQuery,
} = transactionApi;
