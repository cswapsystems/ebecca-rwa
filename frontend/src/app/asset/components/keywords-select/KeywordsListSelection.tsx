"use client";

import type { FC, JSX } from "react";
import { useCallback } from "react";

import { useAsset } from "@/state/hooks";

import { Flex } from "@/components/primitives";
import KeywordButton from "./KeywordButton";
import { Loader } from "@/components/common";
import { useAssetWizardContext } from "../context/AssetWizardProvider";
import type { KeywordItemDTO } from "./types";

interface Props {
  keywordData: Array<KeywordItemDTO>;
  isLoading: boolean;
}

const KeywordsListSelection: FC<Props> = ({ keywordData, isLoading }): JSX.Element => {
  const { updateAssetFormDraftKeywords } = useAsset();
  const { selectedKeywords, setSelectedKeywords, updateField } = useAssetWizardContext();

  const handleKeywordButtonClick = useCallback(
    (data: KeywordItemDTO): void => {
      const isAlreadySelected = Boolean(selectedKeywords.find((sk) => sk.id === data.id));

      if (isAlreadySelected) {
        const updatedSelectedKeywords = selectedKeywords.filter((sk) => sk.id !== data.id);
        updateAssetFormDraftKeywords(updatedSelectedKeywords);
        setSelectedKeywords(updatedSelectedKeywords);
        if (updatedSelectedKeywords.length < 1) {
          updateField("keywords", [], true);
          return;
        }
        updateField("keywords", updatedSelectedKeywords, true);
      } else {
        const updatedSelectedKeywords = [...selectedKeywords, data];
        updateAssetFormDraftKeywords(updatedSelectedKeywords);
        setSelectedKeywords(updatedSelectedKeywords);
        updateField("keywords", updatedSelectedKeywords, true);
      }
    },
    [selectedKeywords, setSelectedKeywords, updateField, updateAssetFormDraftKeywords]
  );

  return (
    <>
      <Loader isLoading={isLoading} title="Loading keywords..." />
      <Flex.Row flexWrap="wrap" columnGap="10px" rowGap="20px">
        {!isLoading && (
          <>
            {keywordData.map((keyword) => (
              <KeywordButton
                key={keyword.id}
                data={keyword}
                isSelected={Boolean(selectedKeywords.find((sk) => sk.id === keyword.id))}
                onClick={() => handleKeywordButtonClick(keyword)}
              />
            ))}
          </>
        )}
      </Flex.Row>
    </>
  );
};

export default KeywordsListSelection;
