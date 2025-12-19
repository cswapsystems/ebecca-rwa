"use client";

import { useMemo } from "react";

import type { KeywordItemDTO } from "./types";

import { useAssetWizardContext } from "../context/AssetWizardProvider";
import { useFetchSubcategoryTagsBySubcategoryIdQuery } from "@/lib/services/subcategoryApi";

type UseGetKeywordData = () => {
  keywordData: Array<KeywordItemDTO>;
  isLoading: boolean;
};

const useGetKeywordData: UseGetKeywordData = () => {
  const { selectedSubcategoryId } = useAssetWizardContext();
  const {
    data: subcategoryTags,
    isLoading: isSubcategoryTagsLoading,
    isFetching: isSubcategoryTagsFetching,
  } = useFetchSubcategoryTagsBySubcategoryIdQuery(selectedSubcategoryId ?? "", {
    skip: !selectedSubcategoryId,
    refetchOnFocus: true,
  });

  const keywordData = useMemo<KeywordItemDTO[]>(() => {
    if (!subcategoryTags) return [];

    return subcategoryTags?.map((tag) => ({
      id: tag?.tagId,
      keyword: tag?.tagName,
    }));
  }, [subcategoryTags]);

  const isLoading = useMemo<boolean>(() => {
    return isSubcategoryTagsLoading || isSubcategoryTagsFetching;
  }, [isSubcategoryTagsLoading, isSubcategoryTagsFetching]);

  return {
    keywordData,
    isLoading,
  };
};

export default useGetKeywordData;
