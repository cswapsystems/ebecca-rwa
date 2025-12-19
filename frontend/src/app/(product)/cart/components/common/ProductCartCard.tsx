'use client';

import type { FC, JSX, PropsWithChildren, CSSProperties } from 'react';
import styled from 'styled-components';

import { Card } from '@/components/common';

import { breakpoints } from '@/constants';

interface ProductCartCardProps extends PropsWithChildren<Pick<CSSProperties, 'width' | 'minHeight'>> {
  isMobileHidden?: boolean;
}

const StyledCardWrapper = styled(Card)<Pick<ProductCartCardProps, 'isMobileHidden'>>`
  padding: 24px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 24px 10px;
    display: ${({ isMobileHidden }) => !!isMobileHidden && 'none'};
  }
`;

const ProductCartCard: FC<PropsWithChildren<ProductCartCardProps>> = ({
  children,
  width = '100%',
  minHeight,
  isMobileHidden = false,
}): JSX.Element => (
  <StyledCardWrapper
    display="flex"
    flexDirection="column"
    gap="42px"
    borderRadius="14px"
    width={width}
    border="none"
    boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
    minHeight={minHeight}
    isMobileHidden={isMobileHidden}
  >
    {children}
  </StyledCardWrapper>
);

export default ProductCartCard;
