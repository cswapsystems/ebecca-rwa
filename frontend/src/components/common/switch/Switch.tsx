"use client";

import type { FC, JSX, CSSProperties } from "react";
import { useState, useCallback } from "react";

import { SwitchContainer, SwitchThumb } from "./SwitchStyles";

interface SwitchProps extends Pick<CSSProperties, "width"> {
  checked: boolean;
  disabled?: boolean;
  checkedBackgroundColor?: string;
  uncheckedBackgroundColor?: string;
  thumbColor?: string;
  thumbWidth?: CSSProperties["width"];
  onChange?: (checked: boolean) => void;
}

const Switch: FC<SwitchProps> = ({
  checked,
  checkedBackgroundColor,
  disabled,
  thumbColor,
  thumbWidth,
  uncheckedBackgroundColor,
  width,
  onChange,
}): JSX.Element => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = useCallback((): void => {
    if (disabled) return;
    setIsChecked((prev) => !prev);
    onChange?.(!isChecked);
  }, [isChecked, disabled]);

  return (
    <SwitchContainer
      role="switch"
      type="button"
      $checked={isChecked}
      $width={width}
      disabled={disabled}
      aria-checked={checked}
      onClick={handleToggle}
      $checkedBackgroundColor={checkedBackgroundColor}
      $uncheckedBackgroundColor={uncheckedBackgroundColor}
    >
      <SwitchThumb $checked={isChecked} $thumbWidth={thumbWidth} $thumbColor={thumbColor} />
    </SwitchContainer>
  );
};

export default Switch;
