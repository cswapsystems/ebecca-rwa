import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AssetWizardFormData } from "@/app/asset/components/context/AssetWizardProvider";
import type { KeywordItemDTO } from "@/app/asset/components/keywords-select/types";
import type { ProductGalleryDataDTO } from "@/components/shared/product-details/product-gallery-investment/product-gallery/types";
import type { AssetInput } from "@/lib/data/assetData";

export interface AssetState {
  formDraftStep: number | null;
  formDraftData: AssetWizardFormData | Record<string, string | object | unknown> | null;
  formDraftCategoryId: string | null;
  formDraftSubcategoryId: string | null;
  formDraftKeywords: Array<KeywordItemDTO> | null;
  formDraftCategoryName: string | null;
  formDraftSubcategoryName: string | null;
  formDraftAssetTypeId: string | null;
  formDraftImageGalleryData: Array<ProductGalleryDataDTO> | null;
  generatedCertificateUrl: string | null;
  createdAssetData: AssetInput;
}

const initialState: AssetState = {
  formDraftStep: null,
  formDraftData: null,
  formDraftCategoryId: null,
  formDraftSubcategoryId: null,
  formDraftKeywords: null,
  formDraftCategoryName: null,
  formDraftSubcategoryName: null,
  formDraftAssetTypeId: null,
  formDraftImageGalleryData: null,
  generatedCertificateUrl: null,
  createdAssetData: {
    categoryId: " ",
    subcategoryId: " ",
    assetTypeId: " ",
    images: [" "],
    name: " ",
    tags: '[{"tagId":"","tagName":""}]',
    price: '[{"M":{"currency":{"S":"USD"},"amount":{"N":""}}},{"M":{"currency":{"S":"ADA"},"amount":{"N":""}}}]',
  },
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    updateFormDraftStep: (state, action: PayloadAction<number | null>) => {
      state.formDraftStep = action.payload;
    },
    updateFormDraftData: (
      state,
      action: PayloadAction<AssetWizardFormData | Record<string, string | object | unknown> | null>
    ) => {
      state.formDraftData = action.payload;
    },
    updateFormDraftCategoryId: (state, action: PayloadAction<string | null>) => {
      state.formDraftCategoryId = action.payload;
    },
    updateFormDraftSubcategoryId: (state, action: PayloadAction<string | null>) => {
      state.formDraftSubcategoryId = action.payload;
    },
    updateFormDraftKeywords: (state, action: PayloadAction<Array<KeywordItemDTO> | null>) => {
      state.formDraftKeywords = action.payload;
    },
    updateFormDraftCategoryName: (state, action: PayloadAction<string | null>) => {
      state.formDraftCategoryName = action.payload;
    },
    updateFormDraftSubcategoryName: (state, action: PayloadAction<string | null>) => {
      state.formDraftSubcategoryName = action.payload;
    },
    updateFormDraftAssetTypeId: (state, action: PayloadAction<string | null>) => {
      state.formDraftAssetTypeId = action.payload;
    },
    updateFormDraftImageGalleryData: (state, action: PayloadAction<Array<ProductGalleryDataDTO> | null>) => {
      state.formDraftImageGalleryData = action.payload;
    },
    updateGeneratedCertificateUrl: (state, action: PayloadAction<string | null>) => {
      state.generatedCertificateUrl = action.payload;
    },
    updateCreatedAssetData: (state, action: PayloadAction<Partial<AssetInput>>) => {
      state.createdAssetData = {
        ...state.createdAssetData,
        ...action.payload,
      };
    },
    resetCreatedAssetData: (state) => {
      state.createdAssetData = initialState.createdAssetData;
    },
    resetDraftFormData: (state) => {
      state.formDraftStep = null;
      state.formDraftData = null;
      state.formDraftCategoryId = null;
      state.formDraftSubcategoryId = null;
      state.formDraftKeywords = null;
      state.formDraftCategoryName = null;
      state.formDraftSubcategoryName = null;
      state.formDraftAssetTypeId = null;
      state.formDraftImageGalleryData = null;
    },
  },
});

export type AssetActions = typeof assetSlice.actions;

export const {
  updateFormDraftStep,
  updateFormDraftData,
  updateFormDraftCategoryId,
  updateFormDraftSubcategoryId,
  updateFormDraftKeywords,
  updateFormDraftCategoryName,
  updateFormDraftSubcategoryName,
  updateFormDraftAssetTypeId,
  updateFormDraftImageGalleryData,
  updateGeneratedCertificateUrl,
  updateCreatedAssetData,
  resetDraftFormData,
  resetCreatedAssetData,
} = assetSlice.actions;

export default assetSlice.reducer;
