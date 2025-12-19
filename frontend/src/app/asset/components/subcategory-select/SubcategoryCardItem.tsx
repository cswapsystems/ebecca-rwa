"use client";

import type { FC, JSX, ButtonHTMLAttributes } from "react";
import { useState } from "react";

import { Typography } from "@/components/common";
import { Flex } from "@/components/primitives";
import { AssetWizardCardSelectButton } from "../common/StyledElements";
import { SubcategoryCard, SubcategoryCardImageWrapper, SubcategoryCardImage } from "./StyledElements";
import type { AssetWizardCommonDataDTO } from "../data/types";

import { useAssetWizardContext } from "../context/AssetWizardProvider";

interface Props extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  data: AssetWizardCommonDataDTO;
}

const SubcategoryCardItem: FC<Props> = ({ data, onClick }): JSX.Element => {
  const { selectedSubcategoryId } = useAssetWizardContext();

  const [cardImageSrc, setCardImageSrc] = useState(data?.imageSrc);

  return (
    <AssetWizardCardSelectButton
      type="button"
      name="subcategory"
      aria-label="Subcategory Button Card"
      onClick={onClick}
    >
      <SubcategoryCard
        display="flex"
        flexDirection="column"
        width="100%"
        backgroundColor={(theme) => theme.colors.white}
        $isSelected={Boolean(data?.id === selectedSubcategoryId)}
      >
        <SubcategoryCardImageWrapper>
          <SubcategoryCardImage
            src={cardImageSrc}
            fill
            alt="Subcategory Image"
            onError={() => setCardImageSrc("/images/placeholder-img.png")}
          />
        </SubcategoryCardImageWrapper>
        <Flex.Column rowGap="4px" width="100%">
          <Typography.H4 size="20px" lineHeight={26} color={(theme) => theme.colors.base950} weight={700}>
            {data?.title}
          </Typography.H4>
          {data?.description && (
            <Typography.P size="14px" lineHeight={20} color={(theme) => theme.colors.base500} weight={400}>
              {data?.description}
            </Typography.P>
          )}
        </Flex.Column>
      </SubcategoryCard>
    </AssetWizardCardSelectButton>
  );
};

export default SubcategoryCardItem;
