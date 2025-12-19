"use client";

import type { FC, JSX, PropsWithChildren } from "react";
import styled from "styled-components";

import type { CardProps, CardStyleProps } from "./types";

const StyledBaseCard = styled.div<CardStyleProps>`
  background-color: ${({ $backgroundColor, theme }) =>
    typeof $backgroundColor === "function" ? $backgroundColor(theme) : ($backgroundColor ?? theme.colors.white)};
  border: ${({ $border }) => $border ?? "2px solid #2d3648"};
  box-shadow: ${({ $boxShadow }) => $boxShadow ?? undefined};
  padding: ${({ $padding }) => $padding ?? undefined};
  display: ${({ $display }) => $display ?? undefined};
  flex-direction: ${({ $flexDirection }) => $flexDirection ?? undefined};
  justify-content: ${({ $justifyContent }) => $justifyContent ?? undefined};
  align-items: ${({ $alignItems }) => $alignItems ?? undefined};
  gap: ${({ $gap }) => $gap ?? undefined};
  width: ${({ $width }) => $width ?? undefined};
  height: ${({ $height }) => $height ?? undefined};
  min-height: ${({ $minHeight }) => $minHeight ?? undefined};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? undefined};
  border: ${({ $border }) => $border ?? undefined};
  padding-left: ${({ $paddingLeft }) => $paddingLeft ?? undefined};
  padding-right: ${({ $paddingRight }) => $paddingRight ?? undefined};
  padding-top: ${({ $paddingTop }) => $paddingTop ?? undefined};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom ?? undefined};
`;

const BaseCard: FC<PropsWithChildren<CardProps>> = ({ children, className, ...props }): JSX.Element => {
  const styleProps: CardStyleProps = {
    $padding: props.padding,
    $backgroundColor: props.backgroundColor,
    $display: props.display,
    $flexDirection: props.flexDirection,
    $alignItems: props.alignItems,
    $justifyContent: props.justifyContent,
    $gap: props.gap,
    $width: props.width,
    $height: props.height,
    $minHeight: props.minHeight,
    $borderRadius: props.borderRadius,
    $border: props.border,
    $paddingLeft: props.paddingLeft,
    $paddingRight: props.paddingRight,
    $paddingTop: props.paddingTop,
    $paddingBottom: props.paddingBottom,
    $boxShadow: props.boxShadow,
  };

  return (
    <StyledBaseCard className={className} {...styleProps}>
      {children}
    </StyledBaseCard>
  );
};

export default BaseCard;
