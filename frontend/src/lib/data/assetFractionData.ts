"use server";

import { SortDirection } from "@/types";
import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Asset Fractions
export const fetchAssetFractions = async () => {
  const { data: assetFractions, errors } = await cookieBasedClient.models.AssetFraction.list();

  if (errors) {
    console.error("Error fetching the list of asset fractions", errors);
    throw new Error("Failed to fetch the list of asset fractions");
  }

  return assetFractions;
};

// Fetch Asset Fractions by Parent Asset ID
export const fetchAssetFractionsByParentAssetId = async (parentAssetId: string, sortDirection: SortDirection = "DESC") => {
  const { data: assetFractions, errors } = await cookieBasedClient.models.AssetFraction.listAssetFractionByParentAssetIdAndFractionalizationDate(
    { parentAssetId: parentAssetId },
    { sortDirection: sortDirection },
  );

  if (errors) {
    console.error("Error fetching the list of asset fractions using Parent Asset ID", errors);
    throw new Error("Failed to fetch the list of asset fractions using Parent Asset ID");
  }

  return assetFractions;
};

// Fetch Asset Fractions by Owner ID
export const fetchAssetFractionsByOwnerId = async (ownerId: string) => {
  const { data: assetFractions, errors } = await cookieBasedClient.models.AssetFraction.listAssetFractionByOwnerId({
    ownerId: ownerId,
  });

  if (errors) {
    console.error("Error fetching the list of asset fractions using Owner ID", errors);
    throw new Error("Failed to fetch the list of asset fractions using Owner ID");
  }

  return assetFractions;
};

// Fetch Asset Fraction by Asset Fraction ID
export const fetchAssetFractionByAssetFractionId = async (assetFractionId: string) => {
  const { data: assetFraction, errors } = await cookieBasedClient.models.AssetFraction.get({
    id: assetFractionId,
  });

  if (errors) {
    console.error("Error fetching the asset fraction using Asset Fraction ID", errors);
    throw new Error("Failed to fetch the asset fraction using Asset Fraction ID");
  }

  return assetFraction;
};
