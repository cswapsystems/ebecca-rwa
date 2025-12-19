import styled from 'styled-components';

import { Flex } from '@/components/primitives';
import { Card } from '@/components/common';

import { breakpoints } from '@/constants';

export const BaseStyledProductDetailsContainer = styled.section`
  width: 100dvw;
  padding: 24px 60px 60px 60px;
  border: 0px;
  background-color: ${({ theme }) => theme.colors.base50};

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 24px 16px 280px 16px;
  }

  @media only screen and (min-width: ${breakpoints.l + 1}px) and (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 280px;
  }
`;

export const StyledProductDetailsContentContainer = styled(Flex.Row)`
  margin-bottom: 500px;

  @media only screen and (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;

export const StyledProductDetailsContentContainerMobile = styled(Card)`
  @media only screen and (min-width: 800px) and (max-width: ${breakpoints.l}px) {
    margin-bottom: 500px;
  }
  @media only screen and (min-width: ${breakpoints.l + 1}px) {
    display: none;
  }
`;
