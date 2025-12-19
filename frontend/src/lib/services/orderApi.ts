import { Order, SortDirection } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchOrders,
  fetchOrdersByOwnerId,
  fetchOrderByOrderId,
} from "../data/orderData";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      queryFn: async () => {
        try {
          const orders = await fetchOrders();

          return { data: orders };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of orders",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchOrdersByOwnerId: builder.query<Order[], { ownerId: string; sortDirection?: SortDirection }>({
      queryFn: async ({ ownerId, sortDirection }) => {
        try {
          const orders = await fetchOrdersByOwnerId(ownerId, sortDirection);

          return { data: orders };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of orders using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchOrderByOrderId: builder.query<Order | null, string>({
      queryFn: async (orderId: string) => {
        try {
          const order = await fetchOrderByOrderId(orderId);

          return { data: order };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the order using Order ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  useFetchOrdersByOwnerIdQuery,
  useFetchOrderByOrderIdQuery,
} = orderApi;
