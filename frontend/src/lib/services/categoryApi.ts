import { Category } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchCategories, fetchCategoriesByCategoryCode, fetchCategoryByCategoryId } from "../data/categoryData";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Dummy Base URL
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      queryFn: async () => {
        try {
          const categories = await fetchCategories();

          return { data: categories };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of categories",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchCategoriesByCategoryCode: builder.query<Category[], string>({
      queryFn: async (categoryCode: string) => {
        try {
          const categories = await fetchCategoriesByCategoryCode(categoryCode);

          return { data: categories };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the list of categories using Category Code",
            data: err,
          };

          return { error };
        }
      },
    }),
    fetchCategoryByCategoryId: builder.query<Category | null, string>({
      queryFn: async (categoryId: string) => {
        try {
          const category = await fetchCategoryByCategoryId(categoryId);

          return { data: category };
        } catch (err) {
          const error = {
            status: 500,
            statusText: "Unable to fetch the category using Category ID",
            data: err,
          };

          return { error };
        }
      },
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchCategoriesByCategoryCodeQuery, useFetchCategoryByCategoryIdQuery } =
  categoryApi;
