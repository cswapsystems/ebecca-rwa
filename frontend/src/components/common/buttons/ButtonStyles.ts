import styled from "styled-components";
import { Variant } from "@/types";
import { breakpoints } from "@/constants";
import { colors } from "@/styles/colors";

export const ButtonContainer = styled.button<{
  $variant: Variant;
  $width: string | number;
  $height: string | number;
  $padding: string | number;
  $borderRadius: string | number;
  $iconOnly?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  height: ${({ $height }) => (typeof $height === "string" ? $height : `${$height}px`)};
  background-color: ${({ $variant, $disabled }) =>
    $disabled
      ? $variant === "primary"
        ? colors.primary200
        : colors.base100
      : $variant === "primary"
        ? "var(--brand)"
        : $variant === "earning"
          ? colors.positive100
          : "transparent"};
  border: ${({ $variant, $disabled }) =>
    $disabled
      ? $variant === "primary"
        ? "none"
        : `1px solid ${colors.base200}`
      : $variant === "primary"
        ? "none"
        : $variant === "earning"
          ? `1px solid ${colors.positive100}`
          : "1px solid #454545"};
  color: ${({ $variant, $disabled }) =>
    $disabled
      ? $variant === "primary"
        ? colors.white
        : colors.base500
      : $variant === "primary"
        ? "var(--button-text)"
        : $variant === "earning"
          ? colors.positive700
          : "#454545"};
  padding: ${({ $padding, $iconOnly }) =>
    $iconOnly ? "8px" : typeof $padding === "string" ? $padding : `${$padding}px`};
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === "string" ? $borderRadius : `${$borderRadius}px`)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ $variant, $disabled }) =>
      $disabled
        ? $variant === "primary"
          ? colors.primary200
          : colors.base100
        : $variant === "primary"
          ? "var(--button-background-hovered)"
          : $variant === "earning"
            ? colors.positive100
            : "#EBEBEB"};
  }

  &:active {
    background-color: ${({ $variant, $disabled }) =>
      $disabled
        ? $variant === "primary"
          ? colors.primary200
          : colors.base100
        : $variant === "primary"
          ? "var(--brand)"
          : $variant === "earning"
            ? colors.positive100
            : "#EBEBEB"};
  }
`;

export const ButtonText = styled.span<{
  $fontSize: string | number;
  $fontWeight: string | number;
  $lineHeight: string | number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  font-family: var(--inter), Inter, sans-serif;
  font-size: ${({ $fontSize }) => (typeof $fontSize === "string" ? $fontSize : `${$fontSize}px`)};
  font-weight: ${({ $fontWeight }) => (typeof $fontWeight === "string" ? $fontWeight : `${$fontWeight}`)};
  line-height: ${({ $lineHeight }) => (typeof $lineHeight === "string" ? $lineHeight : `${$lineHeight}px`)};
  white-space: nowrap;
  user-select: none;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    line-height: 24px;
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const StyledBackButtonWrapper = styled.button`
  background: none;
  padding: 12px 16px;
  border: ${({ theme }) => `1px solid ${theme.colors.base800}`};
  cursor: pointer;
  width: fit-content;
  border-radius: 12px;
`;

export const StyledIconContainer = styled.div`
  position: relative;
  width: 0.938rem;
  height: 0.656rem;
`;
