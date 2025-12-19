import styled from 'styled-components';
import Image from 'next/image';

import { Flex } from '@/components/primitives';
import { Typography } from '@/components/common';

import { breakpoints } from '@/constants';

export const StyledYourCartSectionImageWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 23px;
`;

export const StyledCartItemImageWrapper = styled.div`
  position: relative;
  width: 192px;
  height: 192px;
  border-radius: 16px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }
`;

export const StyledCartItemRemoveButton = styled.button`
  background: none;
  border: 0px;
  cursor: pointer;
`;

export const StyledCounterButtonWrapper = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.base950}`};
  padding: 4px 8px;
  border-radius: 999px;
`;

export const StyledCartItemLayoutImage = styled(Image)`
  border-radius: 16px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    border-radius: 8px;
  }
`;

export const StyledCartItemTagsWrapper = styled(Flex.Row)`
  flex-wrap: wrap;

  @media only screen and (max-width: ${breakpoints.l}px) {
    flex-wrap: nowrap !important;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

export const StyledCartItemLayoutProductDataWrapper = styled(Flex.Column)`
  row-gap: 10px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    row-gap: 16px;
    min-width: 0;
    overflow: hidden;
  }
`;

export const StyledCartItemLayoutCartContentWrapper = styled(Flex.Row)`
  width: auto;

  @media only screen and (max-width: ${breakpoints.l}px) {
    max-width: 100%;
  }
`;

export const CartItemLayoutPriceDesktop = styled(Typography.H4)`
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

export const CartItemLayoutPriceMobile = styled(Typography.H4)`
  display: none;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: block;
  }
`;

export const CartItemLayoutDescriptionMobile = styled(Typography.Span)`
  display: none;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: block;
    word-break: break-word;
    white-space: normal;
    max-width: 100%;
  }
`;

export const CartItemLayoutDescription = styled(Typography.Span)`
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

export const CartQuantityCounterButtonWrapper = styled(Flex.Row)`
  column-gap: 40px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    column-gap: 16px;
  }
`;

export const CartItemLayoutCartTotalWrapper = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: block;
  }
`;

export const ToggleContentButtonWrapper = styled.div`
  display: none;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: block;
  }
`;

export const CartItemLayoutProductNameTextDesktop = styled(Typography.H4)`
  display: block;
  @media only screen and (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

export const CartItemLayoutProductNameTextMobile = styled(Typography.H5)`
  display: block;

  @media only screen and (min-width: ${breakpoints.l + 1}px) {
    display: none;
  }
`;

export const CartItemLayoutProductSummaryText = styled(Typography.Span)`
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.l + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const CartItemLayoutBottomFlexRow = styled(Flex.Row)`
  @media only screen and (max-width: ${breakpoints.l}px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CartItemLayoutRemoveButtonIconWrapper = styled.div`
  width: 14.67px;
  height: 14.67px;
  position: relative;

  @media only screen and (min-width: ${breakpoints.l + 1}px) {
    height: 18.33px;
    width: 18.33px;
  }
`;

export const CartItemLayoutRemoveButtonText = styled(Typography.Span)`
  text-decoration: underline;
  text-underline-offset: 4px;
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.l + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;
