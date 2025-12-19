'use client';

import React from 'react';
import { PillContainer, PillText, PillIcon } from './PillStyles';

interface PillProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  padding?: string | number;
  borderRadius?: string | number;
  fontSize?: string | number;
  style?: React.CSSProperties;
}

const Pill: React.FC<PillProps> = ({
  children,
  icon,
  selected = false,
  onClick,
  disabled = false,
  padding = '6px 12px',
  borderRadius = '999px',
  fontSize = 14,
  style,
}) => {
  return (
    <PillContainer
      $selected={selected}
      $disabled={disabled}
      $padding={padding}
      $borderRadius={borderRadius}
      onClick={!disabled ? onClick : undefined}
      style={style}
    >
      <PillText $fontSize={fontSize}>
        {icon && <PillIcon>{icon}</PillIcon>}
        {children}
      </PillText>
    </PillContainer>
  );
};

export default Pill;
