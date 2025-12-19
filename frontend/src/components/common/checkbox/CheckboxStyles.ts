import styled from "styled-components";

import Typography from "../typography/Typography";

import { breakpoints } from "@/constants";

interface Props {
  $label?: string;
  $checked: boolean;
  $onChange: (checked: boolean) => void;
  $disabled?: boolean;
}

export const StyledBox = styled.span<Pick<Props, "$checked">>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.colors.base300}`};
  background-color: ${({ $checked, theme }) => (!!$checked ? theme.colors.primary500 : theme.colors.white)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::after {
    content: "";
    position: absolute;
    width: 10.67px;
    height: 7.33px;
    border-left: 2px solid ${({ $checked, theme }) => ($checked ? theme.colors.white : "transparent")};
    border-bottom: 2px solid ${({ $checked, theme }) => ($checked ? theme.colors.white : "transparent")};
    transform: rotate(-45deg);
  }
`;

export const CheckboxWrapper = styled.label<Pick<Props, "$disabled">>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover ${StyledBox}::after {
    border-left-color: ${({ theme }) => theme.colors.base300}; /* light gray check */
    border-bottom-color: ${({ theme }) => theme.colors.base300};
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const CheckboxGroupTitle = styled(Typography.Span)`
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;
