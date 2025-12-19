"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { DropdownOption } from "@/types";
import { useState } from "react";
import {
  DropdownContainer,
  DropdownViewport,
  GraphicsSection,
  LabelSection,
  Label,
  DropdownArrow,
  DropdownMenu,
  DropdownItem,
  DropdownItemIcon,
} from "./DropdownInputStyles";

interface DropdownInputProps {
  options: DropdownOption[];
  onOptionSelect: (value: string) => void;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  border?: React.CSSProperties["border"];
  borderRadius?: string | number;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  image?: React.ReactNode;
  label?: string; // Custom label to display (e.g., user name)
  hideLabelOnMobile?: boolean; // Hide label on mobile devices
  style?: React.CSSProperties;
  labelGap?: React.CSSProperties["columnGap"];
  labelWidth?: React.CSSProperties["width"];
  labelFlexJustifyContent?: React.CSSProperties["justifyContent"];
  variant?: "default" | "dotted";
  // When true, the button label always shows the placeholder (e.g., "Sort By")
  // regardless of the selected option.
  keepPlaceholderOnSelect?: boolean;
  // External control props for managing multiple dropdowns
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  dropdownId?: string;
  className?: string;
  name?: string;
  value?: DropdownOption;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  onOptionSelect,
  placeholder = "Select",
  width = "auto",
  height = "auto",
  padding = "8px",
  border,
  borderRadius = "0px",
  fontSize = "18px",
  fontWeight = "400",
  lineHeight = "normal",
  disabled = false,
  icon,
  image,
  label,
  hideLabelOnMobile = false,
  style,
  labelGap,
  labelWidth,
  labelFlexJustifyContent,
  variant = "default",
  keepPlaceholderOnSelect = false,
  isExpanded: externalIsExpanded,
  onToggle: externalOnToggle,
  // dropdownId,
  className,
  name,
  value,
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState<boolean>(false);
  const [alignRight, setAlignRight] = useState<boolean>(false);
  const containerRef = useRef<HTMLButtonElement | null>(null);
  // Do not auto-select the first option. This enables placeholder and icon-only modes.
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  // Use external control if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;

  const iconOnly = (variant === "dotted" && !!icon) || (!!icon && !selectedOption?.value && !label);
  const imageOnly = !!image && !selectedOption?.value && !label;

  const toggleDropdown = () => {
    const next = !isExpanded;

    if (!isExpanded && typeof window !== "undefined" && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.left;
      setAlignRight(spaceRight < 300); // flip if space to the right is tight
    }

    if (externalOnToggle) {
      externalOnToggle(next);
    } else {
      setInternalIsExpanded(next);
    }
  };

  const selectOption = (e: React.MouseEvent, option: DropdownOption) => {
    e.stopPropagation();

    setSelectedOption(option);
    onOptionSelect(option.value);

    if (externalOnToggle) {
      externalOnToggle(false);
    } else {
      setInternalIsExpanded(false);
    }
  };

  useEffect(() => {
    if (!!value && !selectedOption) {
      setSelectedOption(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <DropdownContainer
      ref={containerRef}
      $width={width}
      $height={height}
      $padding={padding}
      $borderRadius={borderRadius}
      $border={border}
      $disabled={disabled}
      $variant={variant}
      style={style}
      type="button"
      className={className}
      onClick={toggleDropdown}
      data-dropdown-container
      name={name}
    >
      {iconOnly || imageOnly ? (
        <DropdownViewport>
          <GraphicsSection>{icon ? icon : image}</GraphicsSection>

          {variant !== "dotted" && (
            <DropdownArrow $isExpanded={isExpanded}>
              <Image src="/icons/header/dropdown.svg" alt="Dropdown Arrow" width={20} height={20} draggable={false} />
            </DropdownArrow>
          )}
        </DropdownViewport>
      ) : (
        <DropdownViewport>
          {(icon || image) && <GraphicsSection>{icon ? icon : image}</GraphicsSection>}

          <LabelSection
            $labelGap={labelGap}
            $labelWidth={labelWidth}
            $labelFlexJustifyContent={labelFlexJustifyContent}
          >
            <Label
              $fontSize={fontSize}
              $fontWeight={fontWeight}
              $lineHeight={lineHeight}
              $muted={keepPlaceholderOnSelect || (!selectedOption && !label)}
              $hideOnMobile={hideLabelOnMobile}
            >
              {keepPlaceholderOnSelect ? placeholder : label || selectedOption?.label || placeholder}
            </Label>

            {variant !== "dotted" && (
              <DropdownArrow $isExpanded={isExpanded}>
                <Image src="/icons/header/dropdown.svg" alt="Dropdown Arrow" width={20} height={20} draggable={false} />
              </DropdownArrow>
            )}
          </LabelSection>
        </DropdownViewport>
      )}

      {isExpanded && (
        <DropdownMenu $borderRadius={borderRadius} $alignRight={alignRight}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              $isLiquidate={option.value === "liquidate"}
              onClick={(e) => selectOption(e, option)}
            >
              {option.icon && option.iconPosition === "left" && <DropdownItemIcon>{option.icon}</DropdownItemIcon>}

              {option.label}

              {option.icon && option.iconPosition === "right" && <DropdownItemIcon>{option.icon}</DropdownItemIcon>}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropdownInput;
