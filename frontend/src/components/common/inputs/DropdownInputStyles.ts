import type { CSSProperties } from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { breakpoints } from '@/constants';

interface DropdownContainerProps {
  $width: string | number;
  $height: string | number;
  $padding: string | number;
  $borderRadius: string | number;
  $disabled?: boolean;
  $variant?: 'default' | 'dotted';
  $border?: CSSProperties['border'];
  $labelGap?: CSSProperties['columnGap'];
  $labelWidth?: CSSProperties['width'];
  $labelFlexJustifyContent?: CSSProperties['justifyContent'];
}

export const DropdownContainer = styled.button<DropdownContainerProps>`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  width: ${({ $width }) => (typeof $width === 'string' ? $width : `${$width}px`)};
  height: ${({ $height }) => (typeof $height === 'string' ? $height : `${$height}px`)};
  background: white;
  color: ${({ $disabled }) => ($disabled ? 'var(--button-text-disabled)' : '#1C1C1C')};
  padding: ${({ $padding }) => (typeof $padding === 'string' ? $padding : `${$padding}px`)};
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === 'string' ? $borderRadius : `${$borderRadius}px`)};
  border: ${({ $border }) => $border};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  box-shadow: ${({ $variant }) => ($variant === 'dotted' ? '0 0 0 1px #E7E7E7 inset' : 'none')};
  min-width: 0; /* Allow flex item to shrink below content size */
  flex-shrink: 1; /* Allow shrinking in flex containers */
`;

export const DropdownViewport = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 12px;

  @media only screen and (max-width: ${breakpoints.xl}px) {
    gap: 16px;
  }

  @media only screen and (max-width: ${breakpoints.m}px) {
    gap: 8px;
  }

  @media only screen and (max-width: ${breakpoints.xs}px) {
    gap: 4px;
  }
`;

export const GraphicsSection = styled.section`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const LabelSection = styled.section<
  Pick<DropdownContainerProps, '$labelGap' | '$labelWidth' | '$labelFlexJustifyContent'>
>`
  display: flex;
  align-items: center;
  width: ${({ $labelWidth }) => $labelWidth ?? 'auto'};
  height: 100%;
  gap: ${({ $labelGap }) => $labelGap || '12px'};
  justify-content: ${({ $labelFlexJustifyContent }) => $labelFlexJustifyContent};
  min-width: 0; /* Allow flex item to shrink */
  flex: 1; /* Take available space */
  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: 100%;
  }
`;

export const Label = styled.span<{
  $fontSize: string | number;
  $fontWeight: string | number;
  $lineHeight: string | number;
  $muted?: boolean;
  $hideOnMobile?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  font-family: Inter, sans-serif;
  font-size: ${({ $fontSize }) => (typeof $fontSize === 'string' ? $fontSize : `${$fontSize}px`)};
  font-weight: ${({ $fontWeight }) => (typeof $fontWeight === 'string' ? $fontWeight : `${$fontWeight}`)};
  line-height: ${({ $lineHeight }) => (typeof $lineHeight === 'string' ? $lineHeight : `${$lineHeight}px`)};
  color: ${({ $muted }) => ($muted ? colors.base500 : colors.base950)};
  white-space: nowrap;
  user-select: none;
  min-width: 0; /* Allow text to truncate if needed */
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: ${breakpoints.m}px) {
    ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
  }
`;

export const DropdownArrow = styled.span<{
  $isExpanded: boolean;
}>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? '-180deg' : '0deg')});

  img {
    object-fit: cover;
  }
`;

export const DropdownMenu = styled.ul<{ $borderRadius: string | number; $alignRight?: boolean }>`
  width: max-content;
  min-width: 100%;
  background-color: white;
  padding: 0;
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === 'string' ? $borderRadius : `${$borderRadius}px`)};
  box-shadow: 0 16px 48px 0 rgba(0, 0, 21, 0.18);
  list-style: none;
  position: absolute;
  top: calc(100% + 4px);
  ${({ $alignRight }) => ($alignRight ? 'right: 0; left: auto;' : 'left: 0;')}
  z-index: 100;
  overflow: hidden;
`;

export const DropdownItem = styled.li<{ $isLiquidate?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  font-family: Inter, sans-serif;
  color: ${({ $isLiquidate, theme }) => ($isLiquidate ? theme.colors.negative500 : colors.base900)};
  background-color: transparent;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $isLiquidate, theme }) => ($isLiquidate ? theme.colors.negative50 : '#f0f0f0')};
  }
`;

export const DropdownItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;
