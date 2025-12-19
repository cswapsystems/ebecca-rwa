'use client';

import type { FC, JSX, PropsWithChildren, CSSProperties } from 'react';
import styled from 'styled-components';

import { Card } from '@/components/common';

import { breakpoints } from '@/constants';

type ProductDetailsCardProps = {
  isMobileHidden?: boolean;
} & PropsWithChildren<Pick<CSSProperties, 'width' | 'minHeight' | 'flexDirection' | 'gap'>>;

const CardWrapper = styled(Card)<Pick<ProductDetailsCardProps, 'isMobileHidden'>>`
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 21, 0.075);
  padding: 24px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    box-shadow: none;
    padding: 24px 0px;
    display: ${({ isMobileHidden }) => !!isMobileHidden && 'none'};
  }
`;

const ProductDetailsCard: FC<ProductDetailsCardProps> = ({
  children,
  minHeight,
  width = '100%',
  flexDirection = 'column',
  gap = '28px',
  isMobileHidden,
}): JSX.Element => (
  <CardWrapper
    display="flex"
    flexDirection={flexDirection}
    gap={gap}
    borderRadius="16px"
    width={width}
    border="none"
    minHeight={minHeight}
    isMobileHidden={isMobileHidden}
  >
    {children}
  </CardWrapper>
);

export default ProductDetailsCard;
