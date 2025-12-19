"use client";

import { useRef, forwardRef, type CSSProperties } from "react";
import type { DefaultTheme } from "styled-components";

import { Flex } from "@/components/primitives";
import type { TextWeight } from "../typography/Typography";
import { TextInputRef } from "@/types";
import { TextAreaContainer, TextAreaField, TextAreaLabel } from "./TextAreaInputStyles";

interface TextAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
  label?: string;
  labelColor?: ((theme: DefaultTheme) => CSSProperties["color"]) | CSSProperties["color"];
  labelWeight?: TextWeight;
  name?: string;
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
  inputBorder?: React.CSSProperties["border"];
  inputOutline?: React.CSSProperties["outline"];
  style?: React.CSSProperties;
  inputClassName?: string;
  className?: string;
}

const TextAreaInput = forwardRef<TextInputRef, TextAreaProps>((props, _) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    onChange,
    value,
    label,
    labelColor = (theme) => theme.colors.base300,
    labelWeight = 500,
    name,
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
    style,
    inputBorder,
    inputOutline,
    inputClassName,
    className,
  } = props;

  return (
    <Flex.Column rowGap="8px">
      {label && (
        <TextAreaLabel weight={labelWeight} texttransform="capitalize" color={labelColor}>
          {label}
        </TextAreaLabel>
      )}
      <TextAreaContainer
        $width={width}
        $height={height}
        $padding={padding}
        $borderRadius={borderRadius}
        $disabled={disabled}
        style={style}
        className={className}
      >
        <TextAreaField
          ref={textAreaRef}
          onChange={!disabled ? onChange : undefined}
          value={value}
          name={name}
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
      </TextAreaContainer>
    </Flex.Column>
  );
});

TextAreaInput.displayName = "TextAreaInput";

export default TextAreaInput;
