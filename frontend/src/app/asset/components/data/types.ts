import type { Category } from "@/types";

// Common
export interface AssetWizardCommonDataDTO {
  id: string;
  imageSrc: string;
  title: string;
  description?: string;
}

// Keywords
export interface AssetWizardKeywordDataDTO {
  id: string;
  keyword: string;
}

export type AssetWizardDataType = "category-select" | "subcategory-select" | "keyword";

export interface AssetWizardDataParamsCategorySelect {
  assetWizardType: "category-select" | "subcategory-select";
  categoryData: Array<Category>;
}

export interface AssetWizardDataParamsKeyword {
  assetWizardType: "keyword";
  categoryData?: never;
}

export type AssetWizardDataParams = AssetWizardDataParamsCategorySelect | AssetWizardDataParamsKeyword;

export interface UseGetAssetWizardDataResult<T extends AssetWizardDataType> {
  data: T extends "keyword" ? Array<AssetWizardKeywordDataDTO> : Array<AssetWizardCommonDataDTO>;
  isLoading?: boolean;
}
