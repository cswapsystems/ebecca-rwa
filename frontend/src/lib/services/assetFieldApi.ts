import { AssetField } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  fetchAssetFields,
  fetchAssetFieldByAssetFieldId
} from "../data/assetFieldData";

export const assetFieldApi = createApi({
  reducerPath: "assetFieldApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchAssetFields: builder.query<AssetField[], void>({
      queryFn: async () => {
        try {
          const assetFields = await fetchAssetFields();

          return { data: assetFields };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of asset fields",
            data: err
          };

          return { error };
        }
      },
    }),
    fetchAssetFieldByAssetFieldId: builder.query<AssetField | null, string>({
      queryFn: async (assetFieldId: string) => {
        try {
          const assetField = await fetchAssetFieldByAssetFieldId(assetFieldId);

          return { data: assetField };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the asset field using Asset Field ID",
            data: err
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchAssetFieldsQuery,
  useFetchAssetFieldByAssetFieldIdQuery,
} = assetFieldApi;
