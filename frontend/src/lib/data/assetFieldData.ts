"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Asset Fields
export const fetchAssetFields = async () => {
  const { data: assetFields, errors } = await cookieBasedClient.models.AssetField.list();

  if (errors) {
    console.error("Error fetching the list of asset fields", errors);
    throw new Error("Failed to fetch the list of asset fields");
  }

  return assetFields;
};

// Fetch Asset Field by Asset Field ID
export const fetchAssetFieldByAssetFieldId = async (assetFieldId: string) => {
  const { data: assetField, errors } = await cookieBasedClient.models.AssetField.get({
    id: assetFieldId,
  });

  if (errors) {
    console.error("Error fetching the asset field using Asset Field ID", errors);
    throw new Error("Failed to fetch the asset field using Asset Field ID");
  }

  return assetField;
};
