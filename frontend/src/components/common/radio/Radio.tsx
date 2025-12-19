"use client";

import type { FC, JSX, InputHTMLAttributes, LabelHTMLAttributes } from "react";

import { RadioWrapper, HiddenRadio, CustomStyledRadio } from "./RadioStyles";
import Typography from "../typography/Typography";

export interface RadioProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  checked: boolean;
  disabled?: boolean;
}

const Radio: FC<RadioProps> = ({ label, checked, disabled, onChange }): JSX.Element => {
  return (
    <RadioWrapper $disabled={disabled}>
      <HiddenRadio checked={checked} onChange={onChange} disabled={disabled} />
      <CustomStyledRadio $checked={checked} />
      <Typography.Label
        color={(theme) => theme.colors.primary950}
        weight={400}
        size="16px"
        lineHeight={22}
        texttransform="capitalize"
      >
        {label}
      </Typography.Label>
    </RadioWrapper>
  );
};

export default Radio;
