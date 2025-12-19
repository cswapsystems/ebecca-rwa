import styled from "styled-components";
import Image from "next/image";

import { Grid, Flex } from "@/components/primitives";
import { Card } from "@/components/common";

import { breakpoints } from "@/constants";

interface SubcategoryCardProps {
  $isSelected: boolean;
}

export const SubcategoryGridContainer = styled(Grid.Container)`
  gap: 24px;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 16px;
  }
`;

export const AssetTypeFlexContainer = styled(Flex.Row)`
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 16px;
    flex-wrap: nowrap;
  }
`;

export const SubcategoryCard = styled(Card)<SubcategoryCardProps>`
  padding: 12px;
  border-radius: 24px;
  gap: 16px;
  border: none;
  width: 352px;
  border: ${(props) => (props.$isSelected ? `2px solid ${props.theme.colors.primary500}` : "none")};

  @media only screen and (max-width: ${breakpoints.s}px) {
    padding: 8px;
    border-radius: 16px;
    width: 100%;
  }
`;

export const SubcategoryCardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 171px;
  border-radius: 12px;

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 100%;
    height: 216px;
    border-radius: 8px;
  }
`;

export const SubcategoryCardImage = styled(Image)`
  border-radius: 12px;
  object-fit: cover;

  @media only screen and (max-width: ${breakpoints.s}px) {
    border-radius: 8px;
  }
`;

export const AssetTypeCard = styled(Card)<Pick<SubcategoryCardProps, "$isSelected">>`
  border: ${(props) => (props.$isSelected ? `2px solid ${props.theme.colors.primary500}` : "none")};
`;

export const AssetTypeIconWrapper = styled.div<Pick<SubcategoryCardProps, "$isSelected">>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  min-height: 52px;
  min-width: 52px;
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary50 : theme.colors.base50)};
`;

export const AssetTypeItemButton = styled.button`
  border: 0px;
  background: none;
  cursor: pointer;
`;
