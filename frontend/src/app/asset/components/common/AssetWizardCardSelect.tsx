"use client";

import type { FC, JSX, ButtonHTMLAttributes } from "react";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import type { AssetWizardCommonDataDTO } from "../data/types";

import {
  AssetWizardCardSelectImageContainer,
  AssetWizardCardSelectButton,
  StyledCardSelectTitleDescriptionWrapper,
  AssetWizardCardSelectImageDesktop,
} from "./StyledElements";

import { Card, Typography } from "@/components/common";
import { Flex } from "@/components/primitives";

import { breakpoints } from "@/constants";

interface AssetWizardCardSelectProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  data: AssetWizardCommonDataDTO;
}

const CardSelectTitleDesktop = styled(Typography.H4)`
  @media only screen and (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const CardSelectTitleMobile = styled(Typography.H5)`
  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    display: none;
  }
`;

const CardFlexRow = styled(Flex.Row)`
  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    align-items: center;
  }
`;

const AssetWizardCardSelect: FC<AssetWizardCardSelectProps> = ({ data, onClick }): JSX.Element => {
  const [cardImageSrc, setCardImageSrc] = useState(data?.imageSrc);

  return (
    <AssetWizardCardSelectButton onClick={onClick} type="button" name="category">
      <Card
        padding="16px"
        borderRadius="16px"
        backgroundColor={(theme) => theme.colors.white}
        border="none"
        flexDirection="column"
        width="100%"
        boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
      >
        <CardFlexRow columnGap="20px" rowGap="16px" directionMobile="column">
          <AssetWizardCardSelectImageContainer>
            <Image
              src={cardImageSrc}
              alt={data.title}
              fill
              style={{ borderRadius: "16px", objectFit: "cover" }}
              onError={() => setCardImageSrc("/images/placeholder-img.png")}
            />
          </AssetWizardCardSelectImageContainer>
          <AssetWizardCardSelectImageDesktop
            src={cardImageSrc}
            alt={data.title}
            width={160}
            height={160}
            priority
            unoptimized
            onError={() => setCardImageSrc("/images/placeholder-img.png")}
          />
          <StyledCardSelectTitleDescriptionWrapper alignItems="flex-start" rowGap="20px">
            <CardSelectTitleDesktop weight={700} size="20px" lineHeight="26px" color={(theme) => theme.colors.base950}>
              {data?.title}
            </CardSelectTitleDesktop>
            <CardSelectTitleMobile weight={600} size="18px" lineHeight="24px" color={(theme) => theme.colors.base950}>
              {data?.title}
            </CardSelectTitleMobile>
            {data?.description && (
              <Typography.P weight={400} size="16px" lineHeight="22px" color={(theme) => theme.colors.base500}>
                {data.description}
              </Typography.P>
            )}
          </StyledCardSelectTitleDescriptionWrapper>
        </CardFlexRow>
      </Card>
    </AssetWizardCardSelectButton>
  );
};

export default AssetWizardCardSelect;
