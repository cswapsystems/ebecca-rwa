"use client";

import { useMemo, useEffect } from "react";

import { useAssetWizardContext } from "../context/AssetWizardProvider";
import { useFetchAssetTypesBySubcategoryIdQuery } from "@/lib/services/assetTypeApi";
import { useAsset } from "@/state/hooks";

import type { AssetTypeModel } from "./types";

type UseGetAssetTypesBySubcategoryId = () => {
  assetTypesData: Array<AssetTypeModel>;
  isLoading: boolean;
};

const useGetAssetTypesBySubcategoryId: UseGetAssetTypesBySubcategoryId = () => {
  const { selectedSubcategoryId } = useAssetWizardContext();
  const { invalidateAssetTypesBySubcategoryIdQuery } = useAsset();

  const {
    data: assetTypes,
    isLoading: isQueryLoading,
    isFetching: isQueryFetching,
  } = useFetchAssetTypesBySubcategoryIdQuery(selectedSubcategoryId ?? "", {
    skip: !selectedSubcategoryId,
    refetchOnFocus: false,
  });

  const assetTypesData = useMemo<AssetTypeModel[]>(() => {
    if (!assetTypes) return [];

    return assetTypes?.map((assetType) => ({
      id: assetType?.assetTypeId,
      icon: "",
      label: assetType?.assetTypeName ?? "",
    }));
  }, [assetTypes]);

  const isLoading = useMemo<boolean>(
    () => Boolean(isQueryLoading || isQueryFetching),
    [isQueryLoading, isQueryFetching]
  );

  useEffect(() => {
    if (selectedSubcategoryId) {
      invalidateAssetTypesBySubcategoryIdQuery(selectedSubcategoryId);
    }
  }, [selectedSubcategoryId, invalidateAssetTypesBySubcategoryIdQuery]);

  return { assetTypesData, isLoading };
};

export default useGetAssetTypesBySubcategoryId;
