import styled from "styled-components";
import Image from "next/image";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";

import { breakpoints } from "@/constants";

export const AssetWizardCardSelectImageContainer = styled.div`
  display: none;

  @media only screen and (max-width: ${breakpoints.s}px) {
    position: relative;
    width: 100%;
    height: 12.375rem;
    border-radius: 16px;
    display: block;
  }
`;

export const AssetWizardCardSelectImageDesktop = styled(Image)`
  border-radius: 16px;
  object-fit: cover;

  @media only screen and (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

export const AssetWizardCardSelectButton = styled.button`
  background: none;
  border: 0px;
  width: 100%;
  cursor: pointer;
`;

export const StyledNextCommonButton = styled.button`
  background: ${({ theme }) => theme.colors.primary500};
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  width: fit-content;

  &:disabled {
    background: ${({ theme }) => theme.colors.primary200};
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const StyledCardSelectTitleDescriptionWrapper = styled(Flex.Column)`
  @media only screen and (max-width: ${breakpoints.s}px) {
    row-gap: 16px !important;
  }
`;

export const BaseTemplateMainTitleDesktop = styled(Typography.H3)`
  @media only screen and (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

export const BaseTemplateMainTitleMobile = styled(Typography.H4)`
  @media only screen and (min-width: 701px) {
    display: none;
  }
`;
