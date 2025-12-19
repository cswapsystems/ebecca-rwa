import styled from "styled-components";

import Typography from "../typography/Typography";

import { breakpoints } from "@/constants";

interface RadioProps {
  $label: string;
  $checked: boolean;
  $onChange: () => void;
  $disabled?: boolean;
}

export const RadioWrapper = styled.label<Pick<RadioProps, "$disabled">>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const CustomStyledRadio = styled.span<Pick<RadioProps, "$checked">>`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  border: ${({ theme }) => `1px solid ${theme.colors.base300}`};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background-color: ${({ $checked, theme }) => ($checked ? theme.colors.primary500 : "transparent")};
    transition: background-color 0.18s ease;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    width: ${({ $checked }) => ($checked ? "7px" : "0px")};
    height: ${({ $checked }) => ($checked ? "7px" : "0px")};
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.white};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition:
      width 0.18s ease,
      height 0.18s ease;
  }
`;

export const RadioGroupTitle = styled(Typography.Span)`
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;
