import type { CSSProperties } from "react";
import styled from "styled-components";

interface StyledSwitchProps {
  $checked: boolean;
  $width?: CSSProperties["width"];
  $checkedBackgroundColor?: string;
  $uncheckedBackgroundColor?: string;
  $thumbColor?: string;
  $thumbWidth?: CSSProperties["width"];
}

export const SwitchContainer = styled.button<StyledSwitchProps>`
  position: relative;
  height: 20px;
  width: ${({ $width }) => $width ?? "36px"};
  border-radius: 24px;
  background-color: ${({ $checked, $checkedBackgroundColor, $uncheckedBackgroundColor, theme }) =>
    $checked
      ? ($checkedBackgroundColor ?? theme.colors.primary500)
      : ($uncheckedBackgroundColor ?? theme.colors.base200)};
  border: 0px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.25s ease;
  padding: 0;
  display: inline-flex;
  align-items: center;
`;

export const SwitchThumb = styled.span<Pick<StyledSwitchProps, "$checked" | "$thumbColor" | "$thumbWidth">>`
  position: absolute;
  left: ${({ $checked }) => ($checked ? "18px" : "2px")};
  width: ${({ $thumbWidth }) => $thumbWidth ?? "16px"};
  height: 16px;
  background-color: ${({ $thumbColor, theme }) => $thumbColor ?? theme.colors.white};
  border-radius: 50%;
  transition: left 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
