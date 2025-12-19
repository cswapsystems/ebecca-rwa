import type { CSSProperties } from 'react';
import styled from 'styled-components';

import { breakpoints } from '@/constants';

export interface StyledGridContainerProps {
  $numColumns?: number;
  $mobileNumColumns?: number;
  $gap?: CSSProperties['gap'];
  $width?: CSSProperties['width'];
}

export interface StyledGridItemProps {
  $colSpan?: number;
  $mobileColSpan?: number;
}

export const StyledGridContainer = styled.div<StyledGridContainerProps>`
  display: grid;
  grid-template-columns: repeat(${({ $numColumns = 2 }) => $numColumns}, 1fr);
  gap: ${({ $gap = '16px' }) => $gap};
  width: ${({ $width }) => $width ?? 'auto'};

  @media (max-width: ${breakpoints.s}px) {
    grid-template-columns: repeat(${({ $mobileNumColumns = 1 }) => $mobileNumColumns}, 1fr);
  }
`;

export const StyledGridItem = styled.div<StyledGridItemProps>`
  grid-column: span ${({ $colSpan = 1 }) => $colSpan};

  @media only screen and (max-width: ${breakpoints.s}px) {
    grid-column: span ${({ $mobileColSpan, $colSpan }) => $mobileColSpan ?? $colSpan};
  }
`;
