import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssetFraction, SortDirection } from "@/types";
import {
  fetchAssetFractions,
  fetchAssetFractionsByParentAssetId,
  fetchAssetFractionsByOwnerId,
  fetchAssetFractionByAssetFractionId,
} from "../data/assetFractionData";

export const assetFractionApi = createApi({
  reducerPath: "assetFractionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchAssetFractions: builder.query<AssetFraction[], void>({
      queryFn: async () => {
        try {
          const assetFractions = await fetchAssetFractions();

          return { data: assetFractions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset fractions",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetFractionsByParentAssetId: builder.query<AssetFraction[], { parentAssetId: string; sortDirection?: SortDirection }>({
      queryFn: async ({ parentAssetId, sortDirection }) => {
        try {
          const assetFractions = await fetchAssetFractionsByParentAssetId(parentAssetId, sortDirection);

          return { data: assetFractions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset fractions using Parent Asset ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetFractionsByOwnerId: builder.query<AssetFraction[], string>({
      queryFn: async (ownerId: string) => {
        try {
          const assetFractions = await fetchAssetFractionsByOwnerId(ownerId);

          return { data: assetFractions };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset fractions using Owner ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetFractionByAssetFractionId: builder.query<AssetFraction | null, string>({
      queryFn: async (assetFractionId: string) => {
        try {
          const assetFraction = await fetchAssetFractionByAssetFractionId(assetFractionId);

          return { data: assetFraction };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the asset fraction using Asset Fraction ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchAssetFractionsQuery,
  useFetchAssetFractionsByParentAssetIdQuery,
  useFetchAssetFractionsByOwnerIdQuery,
  useFetchAssetFractionByAssetFractionIdQuery,
} = assetFractionApi;
