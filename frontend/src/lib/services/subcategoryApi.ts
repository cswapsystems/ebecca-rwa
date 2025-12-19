import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Subcategory, SubcategoryTag } from "@/types";
import {
  fetchSubcategories,
  fetchSubcategoriesBySubcategoryCode,
  fetchSubcategoriesByCategoryId,
  fetchSubcategoryBySubcategoryId,
  fetchSubcategoryTags,
  fetchSubcategoryTagsBySubcategoryId,
} from "../data/subcategoryData";

export const subcategoryApi = createApi({
  reducerPath: "subcategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchSubcategories: builder.query<Subcategory[], void>({
      queryFn: async () => {
        try {
          const subcategories = await fetchSubcategories();

          return { data: subcategories };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of subcategories",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchSubcategoriesBySubcategoryCode: builder.query<Subcategory[], string>({
      queryFn: async (subcategoryCode: string) => {
        try {
          const subcategories = await fetchSubcategoriesBySubcategoryCode(subcategoryCode);

          return { data: subcategories };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of subcategories using Subcategory Code",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchSubcategoriesByCategoryId: builder.query<Subcategory[], string>({
      queryFn: async (categoryId: string) => {
        try {
          const subcategories = await fetchSubcategoriesByCategoryId(categoryId);

          return { data: subcategories };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable tto fetch the list of subcategories using Category ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchSubcategoryBySubcategoryId: builder.query<Subcategory | null, string>({
      queryFn: async (subcategoryId: string) => {
        try {
          const subcategory = await fetchSubcategoryBySubcategoryId(subcategoryId);

          return { data: subcategory };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the subcategory using Subcategory ID",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchSubcategoryTags: builder.query<SubcategoryTag[], void>({
      queryFn: async () => {
        try {
          const subcategoryTags = await fetchSubcategoryTags();

          return { data: subcategoryTags };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of subcategory-tags",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchSubcategoryTagsBySubcategoryId: builder.query<SubcategoryTag[], string>({
      queryFn: async (subcategoryId: string) => {
        try {
          const subcategoryTags = await fetchSubcategoryTagsBySubcategoryId(subcategoryId);

          return { data: subcategoryTags };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of subcategory-tags using Subcategory ID",
            data: err,
          };

          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchSubcategoriesQuery,
  useFetchSubcategoriesBySubcategoryCodeQuery,
  useFetchSubcategoriesByCategoryIdQuery,
  useFetchSubcategoryBySubcategoryIdQuery,
  useFetchSubcategoryTagsQuery,
  useFetchSubcategoryTagsBySubcategoryIdQuery,
} = subcategoryApi;
