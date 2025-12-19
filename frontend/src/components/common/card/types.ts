import type { CSSProperties, HTMLAttributes } from "react";
import type { DefaultTheme } from "styled-components";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CSSProperties["padding"];
  backgroundColor?: CSSProperties["backgroundColor"] | ((theme: DefaultTheme) => CSSProperties["backgroundColor"]);
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: CSSProperties["gap"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  minHeight?: CSSProperties["minHeight"];
  borderRadius?: CSSProperties["borderRadius"];
  border?: CSSProperties["border"];
  paddingLeft?: CSSProperties["paddingLeft"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingBottom?: CSSProperties["paddingBottom"];
  boxShadow?: CSSProperties["boxShadow"];
}

export interface CardStyleProps {
  $padding?: CSSProperties["padding"];
  $backgroundColor?: CSSProperties["backgroundColor"] | ((theme: DefaultTheme) => CSSProperties["backgroundColor"]);
  $display?: CSSProperties["display"];
  $flexDirection?: CSSProperties["flexDirection"];
  $alignItems?: CSSProperties["alignItems"];
  $justifyContent?: CSSProperties["justifyContent"];
  $gap?: CSSProperties["gap"];
  $width?: CSSProperties["width"];
  $height?: CSSProperties["height"];
  $minHeight?: CSSProperties["minHeight"];
  $borderRadius?: CSSProperties["borderRadius"];
  $border?: CSSProperties["border"];
  $paddingLeft?: CSSProperties["paddingLeft"];
  $paddingRight?: CSSProperties["paddingRight"];
  $paddingTop?: CSSProperties["paddingTop"];
  $paddingBottom?: CSSProperties["paddingBottom"];
  $boxShadow?: CSSProperties["boxShadow"];
}
