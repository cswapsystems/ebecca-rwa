'use client';

import React from 'react';
import { ToggleContainer, ToggleKnob, ToggleLabel } from './ToggleButtonStyles';

interface ToggleButtonProps {
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  knobSize?: string | number;
  style?: React.CSSProperties;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  width = 48,
  height = 28,
  knobSize = 22,
  style,
}) => {
  const handleClick = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <ToggleContainer
      role="switch"
      aria-checked={checked}
      $checked={checked}
      $disabled={disabled}
      $width={width}
      $height={height}
      $knobSize={knobSize}
      onClick={handleClick}
      style={style}
    >
      <ToggleKnob $checked={checked} $knobSize={knobSize} />
      {label && <ToggleLabel>{label}</ToggleLabel>}
    </ToggleContainer>
  );
};

export default ToggleButton;
