import styled from 'styled-components';

import { Flex } from '@/components/primitives';
import { Button } from '@/components/common';

import { breakpoints } from '@/constants';

export const StyledProductInformationFooterContainer = styled(Flex.Column)`
  margin-top: calc(700px - 500px);
  padding-top: 24px;
  bottom: 0;

  @media only screen and (max-width: 1400px) {
    margin-top: 0;
  }
`;

export const ProductQuantityButtonsWrapper = styled(Flex.Column)`
  row-gap: 20px;
  @media only screen and (max-width: ${breakpoints.xs}px) {
    flex-direction: row;
    column-gap: 20px;
  }
`;

export const StyledQuantityDropdownContainer = styled.button`
  border: ${({ theme }) => `1px solid ${theme.colors.base200}`};
  border-radius: 12px;
  padding: 8px 12px;
  background: none;
  cursor: pointer;
`;

export const StyledAddToCartButton = styled.button`
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.base700}`};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.white};
`;

export const StyledQuantityMaxButton = styled(Button).attrs({ className: 'max-button' })`
  &.max-button {
    width: 89px;

    @media only screen and (max-width: ${breakpoints.xs}px) {
      width: 142px;
    }
  }
`;
