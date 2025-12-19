import styled from 'styled-components';
import { default as NextLink } from 'next/link';

export const Link = styled(NextLink)`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
`;
