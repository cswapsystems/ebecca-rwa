import { Tag } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchTags, fetchTagByTagId } from "../data/tagData";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchTags: builder.query<Tag[], void>({
      queryFn: async () => {
        try {
          const tags = await fetchTags();

          return { data: tags };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of tags",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchTagByTagId: builder.query<Tag | null, string>({
      queryFn: async (tagId: string) => {
        try {
          const tag = await fetchTagByTagId(tagId);

          return { data: tag };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the tag using Tag ID",
            data: err,
          };

          return { error };
        }
      },
    }),
  }),
});

export const { useFetchTagsQuery, useFetchTagByTagIdQuery } = tagApi;
