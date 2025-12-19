import { AssetType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAssetTypes,
  fetchAssetTypesByCategoryId,
  fetchAssetTypesBySubcategoryId,
  fetchAssetTypeByAssetTypeId,
} from "../data/assetTypeData";

export const ASSET_TYPES_KEY_TAG = "AssetTypes";

export const assetTypeApi = createApi({
  reducerPath: "assetTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  tagTypes: [ASSET_TYPES_KEY_TAG],
  endpoints: (builder) => ({
    fetchAssetTypes: builder.query<AssetType[], void>({
      queryFn: async () => {
        try {
          const assetTypes = await fetchAssetTypes();

          return { data: assetTypes };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset types",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetTypesByCategoryId: builder.query<AssetType[], string>({
      queryFn: async (categoryId: string) => {
        try {
          const assetTypes = await fetchAssetTypesByCategoryId(categoryId);

          return { data: assetTypes };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset types using Category ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetTypesBySubcategoryId: builder.query<AssetType[], string>({
      queryFn: async (subcategoryId: string) => {
        try {
          const assetTypes = await fetchAssetTypesBySubcategoryId(subcategoryId);

          return { data: assetTypes };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset types using Subcategory ID",
            data: err,
          };

          return { error };
        }
      },
      providesTags: (result, error, subcategoryId) => [{ type: ASSET_TYPES_KEY_TAG, id: subcategoryId }],
    }),
    fetchAssetTypeByAssetTypeId: builder.query<AssetType | null, string>({
      queryFn: async (assetTypeId: string) => {
        try {
          const assetType = await fetchAssetTypeByAssetTypeId(assetTypeId);

          return { data: assetType };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the asset type using Asset Type ID",
            data: err,
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchAssetTypesQuery,
  useFetchAssetTypesByCategoryIdQuery,
  useFetchAssetTypesBySubcategoryIdQuery,
  useFetchAssetTypeByAssetTypeIdQuery,
  util: assetTypeApiUtil,
} = assetTypeApi;
