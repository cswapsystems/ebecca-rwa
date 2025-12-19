"use server";

import { cookieBasedClient } from "../amplifyDataClient";

export type AssetInputStatus = "Active" | "Inactive" | "Fractionalized" | "Fraction";
export type AssetInputMintingStatus = "InProgress" | "Success" | "Failed" | "Rejected" | "Cancelled";

export interface AssetInputMetadata {
  metadataKey: string;
  metadataValue: string;
  assetFieldId: string;
}

// Type for Create/Update Asset Input
export interface AssetInput {
  id?: string; // Optional - if provided, will update; if not, will create
  name: string; // Required - Display Name
  price?: string; // Required - "[{\"M\":{\"currency\":{\"S\":\"USD\"},\"amount\":{\"N\":\"736\"}}},{\"M\":{\"currency\":{\"S\":\"ADA\"},\"amount\":{\"N\":\"1395.624917\"}}}]"
  categoryId: string; // Required
  subcategoryId: string; // Required
  assetTypeId: string; // Required
  tags: string; // Required - tags?: string; // "[{\"tagId\":\"SUBCAT-COM-GOLD\",\"tagName\":\"Jewelry\"}]"
  images: string[]; // Required
  description?: string;
  highlights?: string[];
  featured?: boolean;
  status?: AssetInputStatus;
  assetId?: string; // On-chain Asset Policy ID + Asset Name
  assetPolicyId?: string; // On-chain Asset Policy ID
  assetName?: string; // On-chain Asset Name
  mintingStatus?: AssetInputMintingStatus;
  mintingResult?: string;
  mintingTxHash?: string;
  isFractionalized?: boolean;
  totalFractions?: number;
  fractionSequence?: number;
  parentAssetId?: string;
  ownerId?: string;
  // Metadata can be included in the asset input, (updateAsset)
  metadata?: AssetInputMetadata[];
}

export interface TagsDTO {
  tagId: string;
  tagName: string;
}

export interface AssetInputResponseDTO {
  assetId: string;
  isNew: boolean;
  message: string;
  success: boolean;
}

// Type for Asset Metadata Input
export interface AssetMetadataInput extends AssetInputMetadata {
  id?: string; // Optional - auto-generated if not provided
  assetId: string; // Required - Reference to Asset
}

// Fetch Assets
export const fetchAssets = async () => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.list();

  if (errors) {
    console.error("Error fetching the list of assets", errors);
    throw new Error("Failed to fetch the list of assets");
  }

  return assets;
};

// Fetch Assets by Category ID
export const fetchAssetsByCategoryId = async (categoryId: string) => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.listAssetByCategoryId({
    categoryId: categoryId,
  });

  if (errors) {
    console.error("Error fetching the list of assets using Category ID", errors);
    throw new Error("Failed to fetch the list of assets using Category ID");
  }

  return assets;
};

// Fetch Assets by Subcategory ID
export const fetchAssetsBySubcategoryId = async (subcategoryId: string) => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.listAssetBySubcategoryId({
    subcategoryId: subcategoryId,
  });

  if (errors) {
    console.error("Error fetching the list of assets using Subcategory ID", errors);
    throw new Error("Failed to fetch the list of assets using Subcategory ID");
  }

  return assets;
};

// Fetch Assets by Asset Type ID
export const fetchAssetsByAssetTypeId = async (assetTypeId: string) => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.listAssetByAssetTypeId({
    assetTypeId: assetTypeId,
  });

  if (errors) {
    console.error("Error fetching the list of assets using Asset Type ID", errors);
    throw new Error("Failed to fetch the list of assets using Asset Type ID");
  }

  return assets;
};

// Fetch Assets by Parent Asset ID
export const fetchAssetsByParentAssetId = async (parentAssetId: string) => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.listAssetByParentAssetId({
    parentAssetId: parentAssetId,
  });

  if (errors) {
    console.error("Error fetching the list of assets using Parent Asset ID", errors);
    throw new Error("Failed to fetch the list of assets using Parent Asset ID");
  }

  return assets;
};

// Fetch Assets by Owner ID
export const fetchAssetsByOwnerId = async (ownerId: string) => {
  const { data: assets, errors } = await cookieBasedClient.models.Asset.listAssetByOwnerId({
    ownerId: ownerId,
  });

  if (errors) {
    console.error("Error fetching the list of assets using Owner ID", errors);
    throw new Error("Failed to fetch the list of assets using Owner ID");
  }

  return assets;
};

// Fetch Asset by Asset ID
export const fetchAssetByAssetId = async (assetId: string) => {
  const { data: asset, errors } = await cookieBasedClient.models.Asset.get({
    id: assetId,
  });

  if (errors) {
    console.error("Error fetching the asset using Asset ID", errors);
    throw new Error("Failed to fetch the asset using Asset ID");
  }

  return asset;
};

/** MUTATIONS */

// Create or Update Asset (Unified Function)
export const createAsset = async (input: AssetInput) => {
  try {
    // Extract metadata from input
    const { metadata, ...assetData } = input;

    // If id is provided, update existing asset
    if (input.id) {
      const result = await updateAsset(input.id, assetData);

      // Create metadata if provided
      if (result.success && metadata && metadata.length > 0) {
        const metadataResult = await createBulkAssetMetadata(result.assetId!, metadata);
        return {
          ...result,
          metadata: metadataResult.metadata,
          metadataStats: {
            total: metadataResult.total,
            successful: metadataResult.successful,
            failed: metadataResult.failed,
          },
        };
      }

      return result;
    }

    // Otherwise, create new asset
    const result = await createNewAsset(assetData);

    // Create metadata if provided
    if (result.success && metadata && metadata.length > 0) {
      const metadataResult = await createBulkAssetMetadata(result.assetId!, metadata);
      return {
        ...result,
        metadata: metadataResult.metadata,
        metadataStats: {
          total: metadataResult.total,
          successful: metadataResult.successful,
          failed: metadataResult.failed,
        },
      };
    }

    return result;
  } catch (error) {
    console.error("Error in createAsset:", error);
    throw error;
  }
};

// ============================================================================
// Sirs, these are all internal functions. Only createAsset() has access to these
// ============================================================================

// Create New Asset (Internal function)
const createNewAsset = async (input: AssetInput) => {
  try {
    // Validate required fields for creation
    if (
      input.name === undefined ||
      input.price === undefined ||
      input.categoryId === undefined ||
      input.subcategoryId === undefined ||
      input.assetTypeId === undefined ||
      input.tags === undefined ||
      !input.images ||
      input.images.length === 0
    ) {
      throw new Error(
        "Missing required fields: name, price, categoryId, subcategoryId, assetTypeId, tags, and images are required"
      );
    }

    const { data: asset, errors } = await cookieBasedClient.models.Asset.create({
      name: input.name,
      price: input.price,
      categoryId: input.categoryId,
      subcategoryId: input.subcategoryId,
      assetTypeId: input.assetTypeId,
      tags: input.tags,
      images: input.images,
      description: input.description || "",
      highlights: input.highlights || [],
      featured: input.featured ?? false,
      status: input.status || "Inactive", // Default to Inactive pending approval
      assetId: input.assetId,
      assetPolicyId: input.assetPolicyId,
      assetName: input.assetName,
      mintingStatus: input.mintingStatus,
      mintingResult: input.mintingResult,
      mintingTxHash: input.mintingTxHash,
      isFractionalized: input.isFractionalized ?? false,
      totalFractions: input.totalFractions,
      fractionSequence: input.fractionSequence,
      parentAssetId: input.parentAssetId,
      ownerId: input.ownerId,
    });

    if (errors) {
      console.error("Error creating asset:", errors);
      throw new Error(errors[0]?.message || "Failed to create asset");
    }

    return {
      success: true,
      asset,
      assetId: asset?.id,
      isNew: true,
    };
  } catch (error) {
    console.error("Error in createNewAsset:", error);
    throw error;
  }
};

// Update Existing Asset (Internal function)
const updateAsset = async (id: string, input: AssetInput) => {
  try {
    // Build update object with only provided fields
    const updateData: { id: string } & Partial<Omit<AssetInput, "id">> = {
      id: id,
    };

    // Only include fields that are provided
    if (input.name !== undefined) updateData.name = input.name;
    if (input.price !== undefined) updateData.price = input.price;
    if (input.categoryId !== undefined) updateData.categoryId = input.categoryId;
    if (input.subcategoryId !== undefined) updateData.subcategoryId = input.subcategoryId;
    if (input.assetTypeId !== undefined) updateData.assetTypeId = input.assetTypeId;
    if (input.tags !== undefined) updateData.tags = input.tags;
    if (input.images !== undefined) updateData.images = input.images;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.highlights !== undefined) updateData.highlights = input.highlights;
    if (input.featured !== undefined) updateData.featured = input.featured;
    if (input.status !== undefined) updateData.status = input.status;
    if (input.assetId !== undefined) updateData.assetId = input.assetId;
    if (input.assetPolicyId !== undefined) updateData.assetPolicyId = input.assetPolicyId;
    if (input.assetName !== undefined) updateData.assetName = input.assetName;
    if (input.mintingStatus !== undefined) updateData.mintingStatus = input.mintingStatus;
    if (input.mintingResult !== undefined) updateData.mintingResult = input.mintingResult;
    if (input.mintingTxHash !== undefined) updateData.mintingTxHash = input.mintingTxHash;
    if (input.isFractionalized !== undefined) updateData.isFractionalized = input.isFractionalized;
    if (input.totalFractions !== undefined) updateData.totalFractions = input.totalFractions;
    if (input.fractionSequence !== undefined) updateData.fractionSequence = input.fractionSequence;
    if (input.parentAssetId !== undefined) updateData.parentAssetId = input.parentAssetId;
    if (input.ownerId !== undefined) updateData.ownerId = input.ownerId;

    const { data: asset, errors } = await cookieBasedClient.models.Asset.update(updateData);

    if (errors) {
      console.error("Error updating asset:", errors);
      throw new Error(errors[0]?.message || "Failed to update asset");
    }

    return {
      success: true,
      asset,
      assetId: asset?.id,
      isNew: false,
    };
  } catch (error) {
    console.error("Error in updateAsset:", error);
    throw error;
  }
};

// Create Asset Metadata
export const createAssetMetadata = async (input: AssetMetadataInput) => {
  try {
    // Validate required fields
    if (!input.metadataKey || !input.metadataValue || !input.assetFieldId || !input.assetId) {
      throw new Error("metadataKey, metadataValue, assetFieldId, and assetId are required");
    }

    const { data: metadata, errors } = await cookieBasedClient.models.AssetMetadata.create({
      metadataKey: input.metadataKey,
      metadataValue: input.metadataValue,
      assetFieldId: input.assetFieldId,
      assetId: input.assetId,
    });

    if (errors) {
      console.error("Error creating asset metadata:", errors);
      throw new Error(errors[0]?.message || "Failed to create asset metadata");
    }

    return {
      success: true,
      metadata,
    };
  } catch (error) {
    console.error("Error in createAssetMetadata:", error);
    throw error;
  }
};

// Create Multiple Asset Metadata entries
export const createBulkAssetMetadata = async (
  assetId: string,
  metadataEntries: {
    metadataKey: string;
    metadataValue: string;
    assetFieldId: string;
  }[]
) => {
  try {
    if (!assetId || !metadataEntries || metadataEntries.length === 0) {
      throw new Error("assetId and metadataEntries are required");
    }

    const metadataPromises = metadataEntries.map((entry) =>
      createAssetMetadata({
        assetId,
        metadataKey: entry.metadataKey,
        metadataValue: entry.metadataValue,
        assetFieldId: entry.assetFieldId,
      })
    );

    const results = await Promise.all(metadataPromises);

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return {
      success: failed.length === 0,
      total: metadataEntries.length,
      successful: successful.length,
      failed: failed.length,
      metadata: successful.map((r) => r.metadata),
    };
  } catch (error) {
    console.error("Error in createBulkAssetMetadata:", error);
    throw error;
  }
};

// format price
export const formatPriceJson = async (prices: { amount: number; currency: string }[]): Promise<string> => {
  return JSON.stringify(prices);
};

// format tags
export const formatTagsJson = async (tags: { tagId: string; tagName: string }[]): Promise<string> => {
  return JSON.stringify(tags);
};
