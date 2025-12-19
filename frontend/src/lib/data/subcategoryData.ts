"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Subcategories
export const fetchSubcategories = async () => {
  const { data: subcategories, errors } = await cookieBasedClient.models.Subcategory.list();

  if (errors) {
    console.error("Error fetching the list of subcategories", errors);
    throw new Error("Failed to fetch the list of subcategories");
  }

  return subcategories;
};

// Fetch Subcategories by Subcategory Code
export const fetchSubcategoriesBySubcategoryCode = async (subcategoryCode: string) => {
  const { data: subcategories, errors } = await cookieBasedClient.models.Subcategory.listSubcategoryBySubcategoryCode({
    subcategoryCode: subcategoryCode,
  });

  if (errors) {
    console.error("Error fetching the list of subcategories using Subcategory Code", errors);
    throw new Error("Failed to fetch the list of subcategories using Subcategory Code");
  }

  return subcategories;
};

// Fetch Subcategories by Category ID
export const fetchSubcategoriesByCategoryId = async (categoryId: string) => {
  const { data: subcategories, errors } = await cookieBasedClient.models.Subcategory.listSubcategoryByCategoryId({
    categoryId: categoryId,
  });

  if (errors) {
    console.error("Error fetching the list of subcategories using Category ID", errors);
    throw new Error("Failed to fetch the list of subcategories using Category ID");
  }

  return subcategories;
};

// Fetch Subcategory by Subcategory ID
export const fetchSubcategoryBySubcategoryId = async (subcategoryId: string) => {
  const { data: subcategory, errors } = await cookieBasedClient.models.Subcategory.get({
    subcategoryId: subcategoryId,
  });

  if (errors) {
    console.error("Error fetching the subcategory using Subcategory ID", errors);
    throw new Error("Failed to fetch the subcategory using Subcategory ID");
  }

  return subcategory;
};

// Fetch Subcategory-Tags
export const fetchSubcategoryTags = async () => {
  const { data: subcategoryTags, errors } = await cookieBasedClient.models.SubcategoryTag.list();

  if (errors) {
    console.error("Error fetching the list of subcategory-tags", errors);
    throw new Error("Failed to fetch the list of subcategory-tags");
  }

  return subcategoryTags;
};

// Fetch Subcategory-Tags by Subcategory ID
export const fetchSubcategoryTagsBySubcategoryId = async (subcategoryId: string) => {
  const { data: subcategoryTags, errors } = await cookieBasedClient.models.SubcategoryTag.list({
    subcategoryId: subcategoryId,
  });

  if (errors) {
    console.error("Error fetching the list of subcategory-tags using Subcategory ID", errors);
    throw new Error("Failed to fetch the list of subcategory-tags using Subcategory ID");
  }

  return subcategoryTags;
};
