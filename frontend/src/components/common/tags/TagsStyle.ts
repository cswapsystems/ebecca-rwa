import styled from 'styled-components';

import { Flex } from '@/components/primitives';
import { Typography } from '@/components/common';

import { breakpoints } from '@/constants';

export const CategoryTagStyleWrapper = styled(Flex.Row)`
  border: ${({ theme }) => `1px solid ${theme.colors.primary100}`};
  background-color: ${({ theme }) => theme.colors.primary50};
  border-radius: 6px;
`;

export const CategoryTagTextStyle = styled(Typography.Span)`
  @media only screen and (max-width: ${breakpoints.xs}px) {
    white-space: nowrap;
  }
`;
