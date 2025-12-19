import styled from 'styled-components';

import { breakpoints } from '@/constants';

const BaseStyledCartContainer = styled.section`
  width: 100dvw;
  padding-right: 60px;
  padding-left: 60px;
  padding-top: 24px;
  padding-bottom: 60px;
  border: 0px;
  background-color: ${({ theme }) => theme.colors.base50};

  @media only screen and (max-width: ${breakpoints.l}px) {
    padding: 24px 16px 40px 16px;
  }

  @media only screen and (min-width: ${breakpoints.l + 1}px) and (max-width: ${breakpoints.xxl}px) {
    padding-bottom: 280px;
  }
`;

export default BaseStyledCartContainer;
