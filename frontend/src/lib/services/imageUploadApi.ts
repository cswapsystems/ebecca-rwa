import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createPresignedUrlWithoutClient } from "../data/assetImagePresignedData";

export const assetImageApi = createApi({
  reducerPath: "assetImageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  tagTypes: ["UserImages"],
  endpoints: (builder) => ({
    // Generate presigned URL for single image upload
    generatePresignedUrl: builder.mutation({
      queryFn: async (options) => {
        try {
          const result = await createPresignedUrlWithoutClient(options);

          if (!result) {
            return {
              error: {
                status: 500,
                statusText: result || "Unable to generate presigned URL",
                data: result,
              },
            };
          }

          return { data: result };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to generate presigned URL",
            data: err,
          };

          return { error };
        }
      },
    }),
  }),
});

export const { useGeneratePresignedUrlMutation } = assetImageApi;
