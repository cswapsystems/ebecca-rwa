"use client";

import type { FC, JSX, InputHTMLAttributes } from "react";

import Typography from "../typography/Typography";
import { CheckboxWrapper, StyledBox, HiddenCheckbox } from "./CheckboxStyles";

export interface CheckboxProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "disabled"> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, disabled, onChange }): JSX.Element => {
  return (
    <CheckboxWrapper $disabled={disabled}>
      <HiddenCheckbox checked={checked} onChange={(e): void => onChange(e?.target?.checked)} disabled={disabled} />
      <StyledBox $checked={checked} />
      <Typography.Span weight={400} size="16px" lineHeight="22px" color={(theme) => theme.colors.primary950}>
        {label}
      </Typography.Span>
    </CheckboxWrapper>
  );
};

export default Checkbox;
