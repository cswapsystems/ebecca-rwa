'use client';

import React from 'react';
import { Variant, GraphicsPosition } from '@/types';
import { ButtonContainer, ButtonText, ButtonIcon } from './ButtonStyles';

interface ButtonProps {
  onClick?: () => void;
  variant: Variant;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  borderRadius?: string | number;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: GraphicsPosition;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  children,
  width = 'auto',
  height = 'auto',
  padding = '12px 16px',
  borderRadius = '16px',
  fontSize = '18px',
  fontWeight = '500',
  lineHeight = '24px',
  disabled = false,
  icon,
  iconPosition = 'right',
  style,
  type = 'button',
  className,
}) => {
  const iconOnly = !!icon && !children;

  return (
    <ButtonContainer
      onClick={!disabled && onClick ? onClick : undefined}
      $variant={variant}
      $width={width}
      $height={height}
      $padding={padding}
      $borderRadius={borderRadius}
      $disabled={disabled}
      $iconOnly={iconOnly}
      style={style}
      type={type}
      className={className}
    >
      {iconOnly ? (
        <ButtonIcon>{icon}</ButtonIcon>
      ) : (
        <ButtonText $fontSize={fontSize} $fontWeight={fontWeight} $lineHeight={lineHeight}>
          {icon && iconPosition === 'left' && <ButtonIcon>{icon}</ButtonIcon>}
          {children}
          {icon && iconPosition === 'right' && <ButtonIcon>{icon}</ButtonIcon>}
        </ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;
