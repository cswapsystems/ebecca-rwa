import { AssetMetadata } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAssetMetadata,
  fetchAssetMetadataByAssetId,
  fetchAssetMetadataByAssetMetadataId,
} from "../data/assetMetadataData";

export const assetMetadataApi = createApi({
  reducerPath: "assetMetadataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchAssetMetadata: builder.query<AssetMetadata[], void>({
      queryFn: async () => {
        try {
          const assetMetadata = await fetchAssetMetadata();

          return { data: assetMetadata };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset metadata",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetMetadataByAssetId: builder.query<AssetMetadata[], string>({
      queryFn: async (assetId: string) => {
        try {
          const assetMetadata = await fetchAssetMetadataByAssetId(assetId);

          return { data: assetMetadata };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset metadata using Asset ID",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetMetadataByAssetMetadataId: builder.query<AssetMetadata | null, string>({
      queryFn: async (assetMetadataId: string) => {
        try {
          const assetMetadata = await fetchAssetMetadataByAssetMetadataId(assetMetadataId);

          return { data: assetMetadata };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the asset metadata using Asset Metadata ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchAssetMetadataQuery,
  useFetchAssetMetadataByAssetIdQuery,
  useFetchAssetMetadataByAssetMetadataIdQuery,
} = assetMetadataApi;
