"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Asset Types
export const fetchAssetTypes = async () => {
  const { data: assetTypes, errors } = await cookieBasedClient.models.AssetType.list();

  if (errors) {
    console.error("Error fetching the list of asset types", errors);
    throw new Error("Failed to fetch the list of asset types");
  }

  return assetTypes;
};

// Fetch Asset Types by Category ID
export const fetchAssetTypesByCategoryId = async (categoryId: string) => {
  const { data: assetTypes, errors } = await cookieBasedClient.models.AssetType.listAssetTypeByCategoryId({
    categoryId: categoryId,
  });

  if (errors) {
    console.error("Error fetching the list of asset types using Category ID", errors);
    throw new Error("Failed to fetch the list of asset types using Category ID");
  }

  return assetTypes;
};

// Fetch Asset Types by Subcategory ID
export const fetchAssetTypesBySubcategoryId = async (subcategoryId: string) => {
  const { data: assetTypes, errors } = await cookieBasedClient.models.AssetType.listAssetTypeBySubcategoryId({
    subcategoryId: subcategoryId,
  });

  if (errors) {
    console.error("Error fetching the list of asset types using Subcategory ID", errors);
    throw new Error("Failed to fetch the list of asset types using Subcategory ID");
  }

  return assetTypes;
};

// Fetch Asset Type by Asset Type ID
export const fetchAssetTypeByAssetTypeId = async (assetTypeId: string) => {
  const { data: assetType, errors } = await cookieBasedClient.models.AssetType.get({
    assetTypeId: assetTypeId,
  });

  if (errors) {
    console.error("Error fetching the asset type using Asset Type ID", errors);
    throw new Error("Failed to fetch the asset type using Asset Type ID");
  }

  return assetType;
};
