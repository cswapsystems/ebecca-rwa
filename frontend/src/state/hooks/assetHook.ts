"use client";

import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "./index";
import type { AssetState } from "../slices/assetSlice";
import {
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
} from "../slices/assetSlice";
import { assetTypeApiUtil } from "@/lib/services/assetTypeApi";
import type { AssetWizardFormData } from "@/app/asset/components/context/AssetWizardProvider";
import type { KeywordItemDTO } from "@/app/asset/components/keywords-select/types";
import type { ProductGalleryDataDTO } from "@/components/shared/product-details/product-gallery-investment/product-gallery/types";
import { ASSET_TYPES_KEY_TAG } from "@/lib/services/assetTypeApi";
import type { AssetInput } from "@/lib/data/assetData";

interface AssetReturn extends AssetState {
  updateAssetFormDraftStep: (step: number | null) => void;
  updateAssetFormData: (data: AssetWizardFormData | Record<string, string | object | unknown> | null) => void;
  updateAssetFormDraftCategoryId: (categoryId: string | null) => void;
  updateAssetFormDraftSubcategoryId: (subcategoryId: string | null) => void;
  updateAssetFormDraftKeywords: (keywords: Array<KeywordItemDTO> | null) => void;
  updateAssetFormDraftCategoryName: (categoryName: string | null) => void;
  updateAssetFormDraftSubcategoryName: (subcategoryName: string | null) => void;
  updateAssetFormDraftAssetTypeId: (assetTypeId: string | null) => void;
  updateAssetFormDraftImageGalleryData: (imageGalleryData: Array<ProductGalleryDataDTO> | null) => void;
  updateCertificateUrl: (url: string | null) => void;
  updateAssetCreatedData: (data: Partial<AssetInput>) => void;
  resetAssetDraftFormData: () => void;
  resetAssetCreatedData: () => void;
  invalidateAssetTypesBySubcategoryIdQuery: (subcategoryId: string) => void;
}

type UseAsset = () => AssetReturn;

export const useAsset: UseAsset = () => {
  const dispatch = useAppDispatch();

  const formDraftStep = useAppSelector((state) => state.asset.formDraftStep);
  const formDraftData = useAppSelector((state) => state.asset.formDraftData);
  const formDraftCategoryId = useAppSelector((state) => state.asset.formDraftCategoryId);
  const formDraftSubcategoryId = useAppSelector((state) => state.asset.formDraftSubcategoryId);
  const formDraftKeywords = useAppSelector((state) => state.asset.formDraftKeywords);
  const formDraftCategoryName = useAppSelector((state) => state.asset.formDraftCategoryName);
  const formDraftSubcategoryName = useAppSelector((state) => state.asset.formDraftSubcategoryName);
  const formDraftAssetTypeId = useAppSelector((state) => state.asset.formDraftAssetTypeId);
  const formDraftImageGalleryData = useAppSelector((state) => state.asset.formDraftImageGalleryData);
  const generatedCertificateUrl = useAppSelector((state) => state.asset.generatedCertificateUrl);
  const createdAssetData = useAppSelector((state) => state.asset.createdAssetData);

  const updateAssetFormDraftStep = useCallback(
    (data: number | null): void => {
      dispatch(updateFormDraftStep(data));
    },
    [dispatch]
  );

  const updateAssetFormData = useCallback(
    (data: AssetWizardFormData | Record<string, string | object | unknown> | null): void => {
      dispatch(updateFormDraftData(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftCategoryId = useCallback(
    (data: string | null): void => {
      dispatch(updateFormDraftCategoryId(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftCategoryName = useCallback(
    (data: string | null): void => {
      dispatch(updateFormDraftCategoryName(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftSubcategoryName = useCallback(
    (data: string | null): void => {
      dispatch(updateFormDraftSubcategoryName(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftSubcategoryId = useCallback(
    (data: string | null): void => {
      dispatch(updateFormDraftSubcategoryId(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftKeywords = useCallback(
    (data: Array<KeywordItemDTO> | null): void => {
      dispatch(updateFormDraftKeywords(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftAssetTypeId = useCallback(
    (data: string | null) => {
      dispatch(updateFormDraftAssetTypeId(data));
    },
    [dispatch]
  );

  const updateAssetFormDraftImageGalleryData = useCallback(
    (data: Array<ProductGalleryDataDTO> | null): void => {
      dispatch(updateFormDraftImageGalleryData(data));
    },
    [dispatch]
  );

  const updateCertificateUrl = useCallback(
    (data: string | null): void => {
      dispatch(updateGeneratedCertificateUrl(data));
    },
    [dispatch]
  );

  const updateAssetCreatedData = useCallback(
    (data: Partial<AssetInput>): void => {
      dispatch(updateCreatedAssetData(data));
    },
    [dispatch]
  );

  const resetAssetDraftFormData = useCallback((): void => {
    dispatch(resetDraftFormData());
  }, [dispatch]);

  const resetAssetCreatedData = useCallback((): void => {
    dispatch(resetCreatedAssetData());
  }, [dispatch]);

  const invalidateAssetTypesBySubcategoryIdQuery = useCallback(
    (subcategoryId: string): void => {
      dispatch(assetTypeApiUtil.invalidateTags([{ type: ASSET_TYPES_KEY_TAG, id: subcategoryId }]));
    },
    [dispatch]
  );

  return {
    formDraftStep,
    formDraftData,
    formDraftCategoryId,
    formDraftSubcategoryId,
    formDraftKeywords,
    formDraftCategoryName,
    formDraftSubcategoryName,
    formDraftAssetTypeId,
    formDraftImageGalleryData,
    generatedCertificateUrl,
    createdAssetData,
    updateAssetFormDraftStep,
    updateAssetFormData,
    updateAssetFormDraftCategoryId,
    updateAssetFormDraftCategoryName,
    updateAssetFormDraftSubcategoryName,
    updateAssetFormDraftSubcategoryId,
    updateAssetFormDraftKeywords,
    updateAssetFormDraftAssetTypeId,
    updateAssetFormDraftImageGalleryData,
    updateCertificateUrl,
    updateAssetCreatedData,
    resetAssetDraftFormData,
    resetAssetCreatedData,
    invalidateAssetTypesBySubcategoryIdQuery,
  };
};
