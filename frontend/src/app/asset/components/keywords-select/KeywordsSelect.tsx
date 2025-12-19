"use client";

import type { FC, JSX } from "react";
import { useMemo, useCallback } from "react";

import AssetWizardFormBaseTemplate from "../common/AssetWizardFormBaseTemplate";
import KeywordsListSelection from "./KeywordsListSelection";
import NextButton from "../common/NextButton";
import { NextButtonContainer } from "./KeywordSelectStyledElements";
import { useAssetWizardContext } from "../context/AssetWizardProvider";
import useGetKeywordData from "./useGetKeywordData";
import { useAsset } from "@/state/hooks";

import type { TagsDTO } from "@/lib/data/assetData";

const KeywordsSelect: FC<object> = (): JSX.Element => {
  const { selectedKeywords } = useAssetWizardContext();
  const mainTitle = useMemo<string>(() => "Select a Keywords", []);
  const subTitle = useMemo<string>(() => "Choose keywords related to your asset from the list below", []);

  const { updateAssetCreatedData } = useAsset();

  const { keywordData, isLoading } = useGetKeywordData();

  const onClickNext = useCallback((): void => {
    const refinedSelectedKeywords: TagsDTO[] = selectedKeywords?.map((keyword) => ({
      tagId: keyword.id,
      tagName: keyword.keyword,
    }));

    updateAssetCreatedData({
      tags: JSON.stringify(refinedSelectedKeywords),
    });
  }, [selectedKeywords, updateAssetCreatedData]);

  return (
    <AssetWizardFormBaseTemplate withBack mainTitle={mainTitle} subTitle={subTitle} isLoading={isLoading}>
      <KeywordsListSelection keywordData={keywordData} isLoading={isLoading} />
      <NextButtonContainer>
        <NextButton isLoading={isLoading} onClick={onClickNext} />
      </NextButtonContainer>
    </AssetWizardFormBaseTemplate>
  );
};

export default KeywordsSelect;
