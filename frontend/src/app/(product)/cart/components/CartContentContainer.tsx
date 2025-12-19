'use client';

import type { FC, JSX, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Flex } from '@/components/primitives';

import { breakpoints } from '@/constants';

const StyledFlexWrapper = styled(Flex.Row)`
  @media only screen and (max-width: ${breakpoints.l + 1}px) {
    flex-direction: column;
  }
`;

const CartContentContainer: FC<PropsWithChildren<object>> = ({ children }): JSX.Element => (
  <StyledFlexWrapper columnGap="22px" alignItems="flex-start" width="100%">
    {children}
  </StyledFlexWrapper>
);

export default CartContentContainer;
