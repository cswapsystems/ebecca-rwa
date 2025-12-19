import type { CSSProperties } from "react";

import styled from "styled-components";
import { colors } from "@/styles/colors";

export const TextInputContainer = styled.div<{
  $width: string | number;
  $height: string | number;
  $padding: string | number;
  $borderRadius: string | number;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  width: ${({ $width }) => (typeof $width === "string" ? $width : `${$width}px`)};
  height: ${({ $height }) => (typeof $height === "string" ? $height : `${$height}px`)};
  background-color: ${({ $disabled }) => ($disabled ? colors.base50 : "transparent")};
  border: 1px solid ${({ $disabled }) => ($disabled ? colors.base200 : "#d1d1d1")};
  color: ${({ $disabled }) => ($disabled ? colors.base500 : "#454545")};
  border-radius: ${({ $borderRadius }) => (typeof $borderRadius === "string" ? $borderRadius : `${$borderRadius}px`)};
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};

  &:focus-within {
    border-color: ${({ $disabled }) => ($disabled ? colors.base200 : "var(--brand)")};
  }

  input {
    border: none;
    padding: ${({ $padding }) => (typeof $padding === "string" ? $padding : `${$padding}px`)};
    border-radius: ${({ $borderRadius }) => (typeof $borderRadius === "string" ? $borderRadius : `${$borderRadius}px`)};
    outline: none;
    background-color: ${({ $disabled }) => ($disabled ? colors.base50 : "transparent")};
    color: ${({ $disabled }) => ($disabled ? colors.base500 : "#454545")};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};
  }
`;

export const InputField = styled.input<{
  $fontSize: string | number;
  $fontWeight: string | number;
  $lineHeight: string | number;
  $border?: CSSProperties["border"];
  $outline?: CSSProperties["outline"];
  $disabled?: boolean;
}>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-family: Inter, sans-serif;
  font-size: ${({ $fontSize }) => (typeof $fontSize === "string" ? $fontSize : `${$fontSize}px`)};
  font-weight: ${({ $fontWeight }) => (typeof $fontWeight === "string" ? $fontWeight : `${$fontWeight}`)};
  line-height: ${({ $lineHeight }) => (typeof $lineHeight === "string" ? $lineHeight : `${$lineHeight}px`)};
  white-space: nowrap;
  border: ${({ $border }) => $border};
  outline: ${({ $outline }) => $outline};
  background-color: ${({ $disabled }) => ($disabled ? colors.base50 : "transparent")};
  color: ${({ $disabled }) => ($disabled ? colors.base500 : "#454545")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
