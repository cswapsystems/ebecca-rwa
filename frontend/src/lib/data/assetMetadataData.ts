"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Asset Metadata
export const fetchAssetMetadata = async () => {
  const { data: assetMetadata, errors } = await cookieBasedClient.models.AssetMetadata.list();

  if (errors) {
    console.error("Error fetching the list of asset metadata", errors);
    throw new Error("Failed to fetch the list of asset metadata");
  }

  return assetMetadata;
};

// Fetch Asset Metadata by Asset ID
export const fetchAssetMetadataByAssetId = async (assetId: string) => {
  const { data: assetMetadata, errors } = await cookieBasedClient.models.AssetMetadata.listAssetMetadataByAssetId({
    assetId: assetId,
  });

  if (errors) {
    console.error("Error fetching the list of asset metadata using Asset ID", errors);
    throw new Error("Failed to fetch the list of asset metadata using Asset ID");
  }

  return assetMetadata;
};

// Fetch Asset Metadata by Asset Metadata ID
export const fetchAssetMetadataByAssetMetadataId = async (assetMetadataId: string) => {
  const { data: assetMetadata, errors } = await cookieBasedClient.models.AssetMetadata.get({
    id: assetMetadataId,
  });

  if (errors) {
    console.error("Error fetching the asset metadata using Asset Metadata ID", errors);
    throw new Error("Failed to fetch the asset metadata using Asset Metadata ID");
  }

  return assetMetadata;
};
