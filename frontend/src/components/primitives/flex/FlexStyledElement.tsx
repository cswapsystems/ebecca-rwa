import styled from 'styled-components';
import type { CSSProperties } from 'react';

import { breakpoints } from '@/constants';

export interface FlexStyledElementProps {
  $direction?: CSSProperties['flexDirection'];
  $directionMobile?: CSSProperties['flexDirection'];
  $alignItems?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
  $rowGap?: CSSProperties['rowGap'];
  $columnGap?: CSSProperties['columnGap'];
  $wrap?: CSSProperties['flexWrap'];
  $margin?: CSSProperties['margin'];
  $marginTop?: CSSProperties['marginTop'];
  $marginBottom?: CSSProperties['marginBottom'];
  $marginLeft?: CSSProperties['marginLeft'];
  $marginRight?: CSSProperties['marginRight'];
  $padding?: CSSProperties['padding'];
  $paddingTop?: CSSProperties['paddingTop'];
  $paddingBottom?: CSSProperties['paddingBottom'];
  $paddingLeft?: CSSProperties['paddingLeft'];
  $paddingRight?: CSSProperties['paddingRight'];
  $height?: CSSProperties['height'];
  $maxHeight?: CSSProperties['maxHeight'];
  $width?: CSSProperties['width'];
  $maxWidth?: CSSProperties['maxWidth'];
}

const FlexStyledElement = styled.div<FlexStyledElementProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'row'};
  align-items: ${({ $alignItems }) => $alignItems ?? undefined};
  justify-content: ${({ $justify }) => $justify ?? undefined};
  row-gap: ${({ $rowGap }) => $rowGap ?? undefined};
  column-gap: ${({ $columnGap }) => $columnGap ?? undefined};
  flex-wrap: ${({ $wrap }) => $wrap ?? undefined};
  margin: ${({ $margin }) => $margin ?? undefined};
  margin-top: ${({ $marginTop }) => $marginTop ?? undefined};
  margin-bottom: ${({ $marginBottom }) => $marginBottom ?? undefined};
  margin-left: ${({ $marginLeft }) => $marginLeft ?? undefined};
  margin-right: ${({ $marginRight }) => $marginRight ?? undefined};
  padding: ${({ $padding }) => $padding ?? undefined};
  padding-top: ${({ $paddingTop }) => $paddingTop ?? undefined};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom ?? undefined};
  padding-left: ${({ $paddingLeft }) => $paddingLeft ?? undefined};
  padding-right: ${({ $paddingRight }) => $paddingRight ?? undefined};
  height: ${({ $height }) => $height ?? undefined};
  max-height: ${({ $maxHeight }) => $maxHeight ?? undefined};
  width: ${({ $width }) => $width ?? undefined};
  max-width: ${({ $maxWidth }) => $maxWidth ?? undefined};

  @media only screen and (max-width: ${breakpoints.s}px) {
    flex-direction: ${({ $directionMobile, $direction }) => $directionMobile ?? $direction ?? 'row'};
  }
`;

export default FlexStyledElement;
