import styled from 'styled-components';

import { Typography } from '@/components/common';
import { Flex } from '@/components/primitives';

import { breakpoints } from '@/constants';

export const StyledOrderSummaryTitle = styled(Typography.Span)`
  display: block;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
`;

// Cart total
export const OrderSummaryTotalContainer = styled(Flex.Column)`
  margin-top: calc(700px - 500px);
  padding-top: 32px;
  align-self: flex-end;
  border-top: ${({ theme }) => `1px solid ${theme.colors.base200}`};
  width: 100%;
  bottom: 0;

  @media only screen and (max-width: ${breakpoints.l}px) {
    margin-top: 0px;
  }
`;

export const OrderSummaryTextMobile = styled(Typography.H3)`
  display: none;

  @media only screen and (max-width: ${breakpoints.l}px) {
    display: block;
  }
`;
