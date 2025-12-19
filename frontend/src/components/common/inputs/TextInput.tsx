"use client";

import React from "react";
import { Button } from "@/components/common";
import { TextInputRef, GraphicsPosition } from "@/types";
import { TextInputContainer, InputField } from "./TextInputStyles";
import { useRef, forwardRef, useImperativeHandle } from "react";

interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  value: string | number;
  name?: string;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
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
  useButtonIcon?: boolean;
  inputBorder?: React.CSSProperties["border"];
  inputOutline?: React.CSSProperties["outline"];
  style?: React.CSSProperties;
  inputClassName?: string;
  className?: string;
}

const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  // Expose the "focus()" function to parent components
  useImperativeHandle(ref, () => ({
    focus: () => {
      textInputRef.current?.focus();
    },
  }));

  const {
    onChange,
    onIconClick = () => {},
    value,
    name,
    type = "text",
    autoFocus = false,
    placeholder = "",
    width = "100%",
    height = "auto",
    padding = "12px 16px",
    borderRadius = "16px",
    fontSize = "16px",
    fontWeight = "400",
    lineHeight = "20px",
    disabled = false,
    icon,
    iconPosition = "right",
    useButtonIcon = true,
    style,
    inputBorder,
    inputOutline,
    inputClassName,
    className,
  } = props;

  const focusOnInputField = () => {
    textInputRef.current?.focus();
    onIconClick();
  };

  return (
    <TextInputContainer
      $width={width}
      $height={height}
      $padding={padding}
      $borderRadius={borderRadius}
      $disabled={disabled}
      style={style}
      className={className}
    >
      {icon && iconPosition === "left" ? (
        useButtonIcon ? (
          <Button variant="primary" onClick={focusOnInputField} icon={icon} borderRadius={12} />
        ) : (
          icon
        )
      ) : null}

      <InputField
        ref={textInputRef}
        onChange={!disabled ? onChange : undefined}
        value={value}
        name={name}
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        readOnly={disabled}
        disabled={disabled}
        $fontSize={fontSize}
        $fontWeight={fontWeight}
        $lineHeight={lineHeight}
        $border={inputBorder}
        $outline={inputOutline}
        $disabled={disabled}
        className={inputClassName}
      />

      {icon && iconPosition === "right" ? (
        useButtonIcon ? (
          <Button
            variant="primary"
            onClick={focusOnInputField}
            style={{ marginRight: 6 }}
            icon={icon}
            borderRadius={12}
          />
        ) : (
          icon
        )
      ) : null}
    </TextInputContainer>
  );
});

// Necessary for "forwardRef" to work
TextInput.displayName = "TextInput";

export default TextInput;
