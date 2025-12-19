"use client";

import type { FC, JSX } from "react";
import { useCallback, useMemo } from "react";

import AssetWizardFormBaseTemplate from "../common/AssetWizardFormBaseTemplate";
import { Grid } from "@/components/primitives";
import AssetWizardCardSelect from "../common/AssetWizardCardSelect";
import type { AssetWizardCommonDataDTO } from "../data/types";
import { useAssetWizardContext } from "../context/AssetWizardProvider";

import useGetAssetWizardData from "../data/useGetAssetWizardData";
import { useAsset } from "@/state/hooks";

import type { Category } from "@/types";

interface Props {
  categoryData: Array<Category>;
}

const CategorySelect: FC<Props> = ({ categoryData }): JSX.Element => {
  const { data: categorySelectData } = useGetAssetWizardData({
    assetWizardType: "category-select",
    categoryData,
  });
  const {
    data: ctxData,
    setData,
    makeNextStep,
    setSelectedCategoryNames,
    updateField,
    updateSelectedCategoryIds,
    updateSelectedSubcategoryIds,
    updateAllSelectedStateKeywords,
    setSelectedSubcategoryNames,
    setSelectedAssetTypeIds,
    updateAllStateDatas,
  } = useAssetWizardContext();
  const { createdAssetData, updateAssetCreatedData } = useAsset();

  const subTitle = useMemo<string>(() => {
    return "Choose an asset from the list below";
  }, []);

  const mainTitle = useMemo<string>(() => {
    return "Select RWA Category";
  }, []);

  const onCategorySelect = useCallback(
    (data: AssetWizardCommonDataDTO): void => {
      updateSelectedCategoryIds(data?.id ?? null);
      updateSelectedSubcategoryIds(null);
      setSelectedAssetTypeIds(null);

      const newData = { ...data, ...ctxData, subcategory: "" };
      updateAllStateDatas(newData);

      setSelectedCategoryNames(data.title ?? null);
      updateAllSelectedStateKeywords([]);
      setSelectedSubcategoryNames(null);
      updateField("category", data.title ?? "");
      updateField("keywords", []);
      updateAssetCreatedData({
        ...(createdAssetData?.assetId && createdAssetData?.assetId !== ""
          ? { assetId: createdAssetData?.assetId }
          : {}),
        categoryId: data?.id ?? " ",
        subcategoryId: " ",
        assetTypeId: " ",
        tags: '[{"tagId":"","tagName":""}]',
        price: '[{"M":{"currency":{"S":"USD"},"amount":{"N":""}}},{"M":{"currency":{"S":"ADA"},"amount":{"N":""}}}]',
      });
      makeNextStep();
    },
    [
      createdAssetData,
      ctxData,
      makeNextStep,
      setSelectedCategoryNames,
      updateAllSelectedStateKeywords,
      updateSelectedCategoryIds,
      updateField,
      setSelectedSubcategoryNames,
      updateSelectedSubcategoryIds,
      setSelectedAssetTypeIds,
      updateAssetCreatedData,
      updateAllStateDatas,
    ]
  );

  return (
    <AssetWizardFormBaseTemplate withBack mainTitle={mainTitle} subTitle={subTitle}>
      <Grid.Container numColumns={2} mobileNumColumns={1} gap="30px" width="100%">
        {(categorySelectData as AssetWizardCommonDataDTO[]).map((item) => (
          <Grid.Item key={item.id}>
            <AssetWizardCardSelect data={item} onClick={(): void => onCategorySelect(item)} />
          </Grid.Item>
        ))}
      </Grid.Container>
    </AssetWizardFormBaseTemplate>
  );
};

export default CategorySelect;
