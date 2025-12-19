import styled from 'styled-components';

import { Card } from '@/components/common';

import { breakpoints } from '@/constants';

type StepperVariant = 'complete' | 'active' | 'inactive';

export interface StepperProps {
  $variant: StepperVariant;
}

export const StepperLine = styled.div`
  height: 60px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.black};
  margin-left: 28.4px;
`;

export const StepperIndicator = styled.div<StepperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $variant }) => ($variant === 'complete' ? '20px' : '16px 23px')};
  border-radius: 30px;
  background-color: ${({ $variant, theme }) =>
    $variant === 'active'
      ? theme.colors.white
      : $variant === 'inactive'
        ? theme.colors.primary50
        : theme.colors.primary500};
  border: ${({ $variant, theme }) => $variant === 'active' && `1px solid ${theme.colors.black}`};
`;

export const PurchaseInformationWrapperCard = styled(Card)`
  width: 50%;
  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 100% !important;
  }
`;
