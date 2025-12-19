import { PaymentMethod } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchPaymentMethods,
  fetchPaymentMethodsByOwnerId,
  fetchPaymentMethodByPaymentMethodId,
} from "../data/paymentData";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchPaymentMethods: builder.query<PaymentMethod[], void>({
      queryFn: async () => {
        try {
          const paymentMethods = await fetchPaymentMethods();

          return { data: paymentMethods };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of payment methods",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchPaymentMethodsByOwnerId: builder.query<PaymentMethod[], string>({
      queryFn: async (ownerId: string) => {
        try {
          const paymentMethods = await fetchPaymentMethodsByOwnerId(ownerId);

          return { data: paymentMethods };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of payment methods using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchPaymentMethodByPaymentMethodId: builder.query<PaymentMethod | null, string>({
      queryFn: async (paymentMethodId: string) => {
        try {
          const paymentMethod = await fetchPaymentMethodByPaymentMethodId(paymentMethodId);

          return { data: paymentMethod };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the payment method using Payment Method ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchPaymentMethodsQuery,
  useFetchPaymentMethodsByOwnerIdQuery,
  useFetchPaymentMethodByPaymentMethodIdQuery,
} = paymentApi;
