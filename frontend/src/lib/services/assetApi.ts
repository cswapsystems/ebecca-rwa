import { Asset } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAssets,
  fetchAssetsByCategoryId,
  fetchAssetsBySubcategoryId,
  fetchAssetsByAssetTypeId,
  fetchAssetsByParentAssetId,
  fetchAssetsByOwnerId,
  fetchAssetByAssetId,
  type AssetInput,
  type AssetInputResponseDTO,
} from "../data/assetData";

import type { GenerateAssetCertificatePdfRequest } from "@/app/api/generate-asset-certificate-pdf/route";

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchAssets: builder.query<Asset[], void>({
      queryFn: async () => {
        try {
          const assets = await fetchAssets();

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetsByCategoryId: builder.query<Asset[], string>({
      queryFn: async (categoryId: string) => {
        try {
          const assets = await fetchAssetsByCategoryId(categoryId);

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets using Category ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetsBySubcategoryId: builder.query<Asset[], string>({
      queryFn: async (subcategoryId: string) => {
        try {
          const assets = await fetchAssetsBySubcategoryId(subcategoryId);

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets using Subcategory ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetsByAssetTypeId: builder.query<Asset[], string>({
      queryFn: async (assetTypeId: string) => {
        try {
          const assets = await fetchAssetsByAssetTypeId(assetTypeId);

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets using Asset Type ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetsByParentAssetId: builder.query<Asset[], string>({
      queryFn: async (parentAssetId: string) => {
        try {
          const assets = await fetchAssetsByParentAssetId(parentAssetId);

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets using Parent Asset ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetsByOwnerId: builder.query<Asset[], string>({
      queryFn: async (ownerId: string) => {
        try {
          const assets = await fetchAssetsByOwnerId(ownerId);

          return { data: assets };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of assets using Owner ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchAssetByAssetId: builder.query<Asset | null, string>({
      queryFn: async (assetId: string) => {
        try {
          const asset = await fetchAssetByAssetId(assetId);

          return { data: asset };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the asset using Asset ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    generateAssetCertificate: builder.mutation<Blob, GenerateAssetCertificatePdfRequest>({
      query: (body) => ({
        url: "/api/generate-asset-certificate-pdf",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
        responseHandler: (response) => response.blob(),
      }),
    }),
    createUpdateAsset: builder.mutation<AssetInputResponseDTO, AssetInput>({
      query: (params) => ({
        url: "/api/test-asset",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const {
  useFetchAssetsQuery,
  useFetchAssetsByCategoryIdQuery,
  useFetchAssetsBySubcategoryIdQuery,
  useFetchAssetsByAssetTypeIdQuery,
  useFetchAssetsByParentAssetIdQuery,
  useFetchAssetsByOwnerIdQuery,
  useFetchAssetByAssetIdQuery,
  useGenerateAssetCertificateMutation,
  useCreateUpdateAssetMutation,
} = assetApi;
