import styled from "styled-components";

import TextInput from "@/components/common/inputs/TextInput";
import { Typography, DropdownInput, TextAreaInput } from "@/components/common";
import { Grid, Flex } from "@/components/primitives";

import { breakpoints } from "@/constants";

export const FormTextInput = styled(TextInput).attrs({ inputClassName: "form-text-input" })`
  border: ${({ theme }) => `1px solid ${theme.colors.base200}`};
  .form-text-input {
    font-size: 16px;
    line-height: 22px;
  }

  @media only screen and (max-width: ${breakpoints.s}px) {
    .form-text-input {
      font-size: 14px !important;
      line-height: 20px !important;
    }
  }
`;

export const FormDropdownInput = styled(DropdownInput).attrs({ className: "form-dropdown-input" })`
  font-size: 16px !important;
  line-height: 22px !important;

  @media only screen and (max-width: ${breakpoints.s}px) {
    font-size: 14px !important;
    line-height: 20px !important;
  }
`;

export const FormGridItem = styled(Grid.Item)`
  margin-top: 12px;
`;

export const FormInputWrapper = styled(Flex.Column)`
  width: 90%;

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

export const FormYearBuiltDropdownInputWrapper = styled(Flex.Column)`
  width: 90%;

  @media only screen and (max-width: ${breakpoints.s}px) {
    width: 100%;
  }
`;

export const FormLabel = styled(Typography.Label)`
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const FormTextArea = styled(TextAreaInput)`
  font-size: 16px !important;
  line-height: 22px !important;
  width: 90%;
  height: 162px;

  @media only screen and (max-width: ${breakpoints.s}px) {
    font-size: 14px !important;
    line-height: 20px !important;
    width: 100%;
  }
`;
