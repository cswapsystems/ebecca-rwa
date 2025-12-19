"use client";

import type { FC, JSX } from "react";
import { useMemo, Fragment, useEffect } from "react";

import AssetWizardFormBaseTemplate from "../common/AssetWizardFormBaseTemplate";
import AssetTypeItem from "./AssetTypeItem";
import { useAssetWizardContext } from "../context/AssetWizardProvider";
import useGetAssetTypesBySubcategoryId from "./useGetAssetTypesBySubcategoryId";
import { Loader } from "@/components/common";
import { AssetTypeFlexContainer } from "./StyledElements";

const ASSET_TYPE_DEFAULT_DATA_VALUE = "general";

const AssetTypeSelect: FC<object> = (): JSX.Element | null => {
  const { selectedSubcategory, selectedAssetTypeId, data, setSelectedAssetTypeIds, updateField } =
    useAssetWizardContext();
  const { assetTypesData, isLoading } = useGetAssetTypesBySubcategoryId();

  const mainTitle = useMemo<string>(() => {
    return selectedSubcategory ? `Select ${selectedSubcategory} type` : "Select type";
  }, [selectedSubcategory]);

  useEffect(() => {
    if (
      !selectedAssetTypeId &&
      (!data?.subcategoryAssetType || (data?.subcategoryAssetType as string)?.length === 0) &&
      assetTypesData
    ) {
      const find = assetTypesData?.find((asset) => asset?.label?.toLowerCase() === ASSET_TYPE_DEFAULT_DATA_VALUE);

      if (find) {
        setSelectedAssetTypeIds(find?.id ?? null);
        updateField("subcategoryAssetType", find?.label ?? "", true);
      }
    }
  }, [assetTypesData, setSelectedAssetTypeIds]);

  if (!selectedSubcategory) {
    return null;
  }

  return (
    <AssetWizardFormBaseTemplate
      withBack={false}
      mainTitle={mainTitle}
      subTitle="Choose the type of commercial real estate your assets falls on"
    >
      <Loader title="Loading..." isLoading={isLoading} />
      {!isLoading && (
        <AssetTypeFlexContainer directionMobile="column">
          {assetTypesData?.map((assetData) => (
            <Fragment key={assetData?.id}>
              <AssetTypeItem data={assetData} />
            </Fragment>
          ))}
        </AssetTypeFlexContainer>
      )}
    </AssetWizardFormBaseTemplate>
  );
};

export default AssetTypeSelect;
