import styled from 'styled-components';

import { breakpoints } from '@/constants';

export const AssetWizardContainer = styled.section`
  min-height: 100dvh;
  width: 100%;
  padding: 0px 120px;
  row-gap: 24px;
  background-color: ${({ theme }) => theme.colors.base50};

  @media (max-width: ${breakpoints.xs}px) {
    min-height: auto;
    padding: 24px 14px 200px 14px;
    row-gap: 16px;
  }

  @media only screen and (min-width: ${breakpoints.xs}px) and (max-width: 899px) {
    padding: 24px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media only screen and (min-width: 900px) and (max-width: ${breakpoints.xl}px) {
    padding: 24px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
