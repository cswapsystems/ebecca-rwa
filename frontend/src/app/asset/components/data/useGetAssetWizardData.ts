"use client";

import { useMemo } from "react";

import type { UseGetAssetWizardDataResult, AssetWizardCommonDataDTO, AssetWizardDataParams } from "./types";
import { useAssetWizardContext } from "../context/AssetWizardProvider";
import { useFetchSubcategoriesByCategoryIdQuery } from "@/lib/services/subcategoryApi";

type UseGetAssetWizardData = (
  params: AssetWizardDataParams
) => UseGetAssetWizardDataResult<AssetWizardDataParams["assetWizardType"]>;

const useGetAssetWizardData: UseGetAssetWizardData = ({ assetWizardType, categoryData: catData }) => {
  const { currentStep, selectedCategoryId } = useAssetWizardContext();
  const {
    data: subcategoriesData,
    isLoading: isSubcategoriesDataLoading,
    isFetching: isSubcategoriesDataFetching,
  } = useFetchSubcategoriesByCategoryIdQuery(selectedCategoryId ?? "", {
    skip: (currentStep < 2 || !selectedCategoryId) && assetWizardType !== "subcategory-select",
    refetchOnFocus: true,
  });

  const categoryData = useMemo<AssetWizardCommonDataDTO[]>(() => {
    return (
      catData?.map((category) => ({
        id: category?.categoryId,
        imageSrc: category?.image,
        title: category?.categoryName,
        description: category?.description ?? "",
      })) || []
    );
  }, [catData]);

  const subcategoryData = useMemo<AssetWizardCommonDataDTO[]>(() => {
    if (!subcategoriesData) return [];
    const data =
      subcategoriesData?.map((subcategory) => ({
        id: subcategory?.subcategoryId,
        imageSrc: subcategory?.image,
        title: subcategory?.subcategoryName,
        description: subcategory?.description ?? "",
      })) || [];
    return data;
  }, [subcategoriesData]);

  const isSubcategoryLoading = useMemo<boolean>(() => {
    return Boolean(isSubcategoriesDataLoading || isSubcategoriesDataFetching);
  }, [isSubcategoriesDataLoading, isSubcategoriesDataFetching]);

  switch (assetWizardType) {
    case "category-select":
      return { data: categoryData };
    case "subcategory-select":
      return { data: subcategoryData, isLoading: isSubcategoryLoading };
    default:
      return { data: [] };
  }
};

export default useGetAssetWizardData;
