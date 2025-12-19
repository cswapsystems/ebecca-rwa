import { CartItem } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchCartItems,
  fetchCartItemByOwnerIdAndAssetId
} from "../data/cartData";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchCartItems: builder.query<CartItem[], void>({
      queryFn: async () => {
        try {
          const cartItems = await fetchCartItems();

          return { data: cartItems };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of cart items",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchCartItemByOwnerIdAndAssetId: builder.query<CartItem | null, { ownerId: string; assetId: string }>({
      queryFn: async ({ ownerId, assetId }) => {
        try {
          const cartItem = await fetchCartItemByOwnerIdAndAssetId(ownerId, assetId);

          return { data: cartItem };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the cart item using Owner ID and Asset ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchCartItemsQuery,
  useFetchCartItemByOwnerIdAndAssetIdQuery,
} = cartApi;
