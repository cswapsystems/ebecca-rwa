import styled from 'styled-components';

import { Typography } from '@/components/common';

import { breakpoints } from '@/constants';

export const Line = styled.hr`
  width: 100%;
  background-color: #cbd2e0;
  height: 1px;
  opacity: 0.4;
`;

export const MetadataHeaderDesktop = styled(Typography.H1)`
  @media only screen and (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

export const MetadataHeaderMobile = styled(Typography.H4)`
  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    display: none;
  }
`;

export const MetadataDescription = styled(Typography.P)`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 18px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 0px;
  }
`;
