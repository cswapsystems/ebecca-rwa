"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Categories
export const fetchCategories = async () => {
  const { data: categories, errors } = await cookieBasedClient.models.Category.list();

  if (errors) {
    console.error("Error fetching the list of categories", errors);
    throw new Error("Failed to fetch the list of categories");
  }

  return categories;
};

// Fetch Categories by Category Code
export const fetchCategoriesByCategoryCode = async (categoryCode: string) => {
  const { data: categories, errors } = await cookieBasedClient.models.Category.listCategoryByCategoryCode({
    categoryCode: categoryCode,
  });

  if (errors) {
    console.error("Error fetching the list of categories using Category Code", errors);
    throw new Error("Failed to fetch the list of categories using Category Code");
  }

  return categories;
};

// Fetch Category by Category ID
export const fetchCategoryByCategoryId = async (categoryId: string) => {
  const { data: category, errors } = await cookieBasedClient.models.Category.get({
    categoryId: categoryId,
  });

  if (errors) {
    console.error("Error fetching the category using Category ID", errors);
    throw new Error("Failed to fetch the category using Category ID");
  }

  return category;
};
