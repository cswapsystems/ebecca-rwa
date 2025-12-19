"use client";

import { useEffect } from "react";

import { useAsset } from "@/state/hooks";
import { useAssetWizardContext } from "../components/context/AssetWizardProvider";

type UseSetDraftAssetFormValues = () => void;

const useSetDraftAssetFormValues: UseSetDraftAssetFormValues = () => {
  const {
    formDraftCategoryId,
    formDraftSubcategoryId,
    formDraftStep,
    formDraftKeywords,
    formDraftData,
    formDraftCategoryName,
    formDraftSubcategoryName,
    formDraftAssetTypeId,
    formDraftImageGalleryData,
  } = useAsset();
  const {
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setCurrentStep,
    setSelectedKeywords,
    setData,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedAssetTypeId,
    setImageGalleryData,
  } = useAssetWizardContext();

  useEffect(() => {
    if (typeof formDraftStep === "number") {
      setCurrentStep(formDraftStep);
    }
    if (!!formDraftCategoryId && formDraftCategoryId?.length > 0) {
      setSelectedCategoryId(formDraftCategoryId);
    }
    if (!!formDraftSubcategoryId && formDraftSubcategoryId?.length > 0) {
      setSelectedSubcategoryId(formDraftSubcategoryId);
    }
    if (Array.isArray(formDraftKeywords)) {
      setSelectedKeywords(formDraftKeywords);
    }
    if (!!formDraftData) {
      setData(formDraftData);
    }
    if (!!formDraftCategoryName) {
      setSelectedCategory(formDraftCategoryName);
    }
    if (!!formDraftSubcategoryName) {
      setSelectedSubcategory(formDraftSubcategoryName);
    }
    if (!!formDraftAssetTypeId) {
      setSelectedAssetTypeId(formDraftAssetTypeId);
    }
    if (!!formDraftImageGalleryData) {
      setImageGalleryData(formDraftImageGalleryData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setCurrentStep,
    setSelectedKeywords,
    setData,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedAssetTypeId,
    setImageGalleryData,
  ]);
};

export default useSetDraftAssetFormValues;
