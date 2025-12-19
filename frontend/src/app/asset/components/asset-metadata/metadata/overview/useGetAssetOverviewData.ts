"use client";

import { useMemo } from "react";

import { useAssetWizardContext } from "../../../context/AssetWizardProvider";

import type { KeywordItemDTO } from "../../../keywords-select/types";

export interface AssetOverviewItem {
  title: string;
  item: string | Array<string>;
}

type UseGetAssetOverviewData = () => Array<AssetOverviewItem>;

const useGetAssetOverviewData: UseGetAssetOverviewData = () => {
  const { data } = useAssetWizardContext();
  const assetOverviewItems = useMemo<AssetOverviewItem[]>(
    () => [
      {
        title: "Category",
        item: (data?.category as string) ?? "",
      },
      {
        title: "Keywords",
        item: data?.keywords ? (data?.keywords as Array<KeywordItemDTO>)?.map((keyword) => keyword.keyword) : [],
      },
      {
        title: "Subcategory",
        item: (data?.subcategory as string) ?? "",
      },
    ],
    [data]
  );

  return assetOverviewItems;
};

export default useGetAssetOverviewData;
