import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { MintingRequestDTO } from "@/types";
import type { GetMintStatusDTO } from "@/blockchain/types";

const MINT_BASE_URL: string = "https://9o5uvq2wcj.execute-api.us-west-1.amazonaws.com";

export const mintApi = createApi({
  reducerPath: "mintApi",
  baseQuery: fetchBaseQuery({ baseUrl: MINT_BASE_URL }),
  endpoints: (builder) => ({
    triggerMintingProcess: builder.mutation<Record<string, string>, MintingRequestDTO>({
      query: (payload: MintingRequestDTO) => ({
        url: "/minter/jobs",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        responseHandler: (response) => response.json(),
      }),
    }),
    getMintingStatusByJobId: builder.query<GetMintStatusDTO, string>({
      query: (jobId) => ({
        url: `/minter/jobs/${jobId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { useTriggerMintingProcessMutation, useGetMintingStatusByJobIdQuery } = mintApi;
