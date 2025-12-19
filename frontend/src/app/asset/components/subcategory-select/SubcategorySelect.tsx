"use client";

import type { FC, JSX } from "react";
import { useMemo, useCallback } from "react";

import AssetWizardFormBaseTemplate from "../common/AssetWizardFormBaseTemplate";
import { Loader } from "@/components/common";
import { SubcategoryGridContainer } from "./StyledElements";
import { Grid } from "@/components/primitives";
import SubcategoryCardItem from "./SubcategoryCardItem";
import AssetTypeSelect from "./AssetTypeSelect";
import NextButton from "../common/NextButton";

import useGetAssetWizardData from "../data/useGetAssetWizardData";
import { useAssetWizardContext } from "../context/AssetWizardProvider";
import { useAsset } from "@/state/hooks";
import type { AssetWizardCommonDataDTO } from "../data/types";

import type { Category } from "@/types";

interface Props {
  categoryData: Array<Category>;
}

const SubcategorySelect: FC<Props> = ({ categoryData }): JSX.Element => {
  const {
    data: ctxData,
    selectedCategory,
    selectedSubcategoryId,
    selectedAssetTypeId,
    updateAllSelectedStateKeywords,
    updateSelectedSubcategoryIds,
    updateField,
    setSelectedSubcategoryNames,
    setSelectedAssetTypeIds,
    updateAllStateDatas,
  } = useAssetWizardContext();
  const { data: subcategorySelectData, isLoading: isSubcategoriesDataLoading } = useGetAssetWizardData({
    assetWizardType: "subcategory-select",
    categoryData,
  });
  const { updateAssetCreatedData } = useAsset();

  const mainTitle = useMemo<string>(() => {
    return selectedCategory ? `Select ${selectedCategory}` : "";
  }, [selectedCategory]);

  const onSubcategorySelect = useCallback(
    (data: AssetWizardCommonDataDTO): void => {
      updateAllSelectedStateKeywords([]);
      setSelectedAssetTypeIds(null);
      updateSelectedSubcategoryIds(data?.id ?? null);
      setSelectedSubcategoryNames(data?.title ?? "");
      updateField("subcategory", data?.title ?? "", true);
      updateField("keywords", [], true);
      updateField("subcategoryAssetType", "", true);
    },
    [
      updateAllSelectedStateKeywords,
      updateSelectedSubcategoryIds,
      updateField,
      setSelectedSubcategoryNames,
      setSelectedAssetTypeIds,
    ]
  );

  const onClickNext = useCallback((): void => {
    if (!selectedSubcategoryId && !selectedAssetTypeId) {
      return;
    }

    updateAssetCreatedData({
      subcategoryId: selectedSubcategoryId || " ",
      assetTypeId: selectedAssetTypeId || " ",
      tags: '[{"tagId":"","tagName":""}]',
      price: '[{"M":{"currency":{"S":"USD"},"amount":{"N":""}}},{"M":{"currency":{"S":"ADA"},"amount":{"N":""}}}]',
    });
  }, [ctxData, selectedSubcategoryId, selectedAssetTypeId, updateAssetCreatedData]);

  return (
    <AssetWizardFormBaseTemplate
      withBack
      mainTitle={mainTitle}
      subTitle="Choose a subcategory from your chosen RWA"
      isLoading={isSubcategoriesDataLoading}
    >
      <Loader title="Loading..." isLoading={Boolean(isSubcategoriesDataLoading)} />
      {!isSubcategoriesDataLoading && (
        <>
          <SubcategoryGridContainer numColumns={3} mobileNumColumns={1} width="fit-content">
            {(subcategorySelectData as AssetWizardCommonDataDTO[])?.map((subcategory) => (
              <Grid.Item key={subcategory.id}>
                <SubcategoryCardItem data={subcategory} onClick={(): void => onSubcategorySelect(subcategory)} />
              </Grid.Item>
            ))}
          </SubcategoryGridContainer>
          <AssetTypeSelect />
          <NextButton style={{ alignSelf: "flex-end" }} onClick={onClickNext} />
        </>
      )}
    </AssetWizardFormBaseTemplate>
  );
};

export default SubcategorySelect;
