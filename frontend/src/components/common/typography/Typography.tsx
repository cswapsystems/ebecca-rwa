"use client";

import type { PropsWithChildren, HTMLAttributes } from "react";
import styled, { type CSSProperties, css, DefaultTheme } from "styled-components";
import { KnownTarget } from "styled-components/dist/types";

export type TextSize = "sm" | "xsm" | "md" | "xmd" | "lg" | "xlg" | "xl" | string;
export type TextWeight = 300 | 400 | 500 | 600 | 700;
export type TextAlign = "left" | "center" | "right" | "justify";

interface TypographyProps extends PropsWithChildren<object>, Pick<HTMLAttributes<HTMLElement>, "style" | "className"> {
  size?: TextSize;
  weight?: TextWeight;
  color?: CSSProperties["color"] | ((theme: DefaultTheme) => CSSProperties["color"]);
  align?: TextAlign;
  lineHeight?: string | number;
  letterSpacing?: string;
  verticalAlign?: string;
  texttransform?: CSSProperties["textTransform"];
  whiteSpace?: CSSProperties["whiteSpace"];
  css?: string;
}

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";

interface TypographyVariantSizeModel {
  size: string;
  lineHeight: string;
}

const sizeMap = {
  sm: "12px",
  xsm: "13px",
  md: "14px",
  xmd: "16px",
  lg: "18px",
  xlg: "20px",
  xl: "24px",
} as const;

const lineHeightMap = {
  sm: "14px",
  md: "20px",
  lg: "24px",
  xlg: "26px",
  xl: "32px",
} as const;

type SizeKey = keyof typeof sizeMap;
type LineHeightKey = keyof typeof lineHeightMap;

const typographyVariantSizeMap = {
  h1: { size: "32px", lineHeight: "40px" },
  h2: { size: "28px", lineHeight: "36px" },
  h3: { size: sizeMap.xl, lineHeight: lineHeightMap.xl },
  h4: { size: sizeMap.xlg, lineHeight: "28px" },
  h5: { size: sizeMap.lg, lineHeight: lineHeightMap.lg },
  h6: { size: "16px", lineHeight: "22px" },
  p: { size: sizeMap.md, lineHeight: lineHeightMap.md },
  span: { size: sizeMap.sm, lineHeight: lineHeightMap.sm },
  label: { size: sizeMap.md, lineHeight: lineHeightMap.md },
} satisfies Record<TypographyVariant, TypographyVariantSizeModel>;

const DEFAULTS: Record<
  TypographyVariant,
  {
    size: keyof typeof typographyVariantSizeMap;
    lineHeight: keyof typeof typographyVariantSizeMap;
    weight: TextWeight;
    letterSpacing?: string;
    align?: TextAlign;
  }
> = {
  h1: { size: "h1", lineHeight: "h1", weight: 700 },
  h2: { size: "h2", lineHeight: "h2", weight: 600 },
  h3: { size: "h3", lineHeight: "h3", weight: 600 },
  h4: { size: "h4", lineHeight: "h4", weight: 600 },
  h5: { size: "h5", lineHeight: "h5", weight: 600 },
  h6: { size: "h6", lineHeight: "h6", weight: 600 },
  p: { size: "p", lineHeight: "p", weight: 400 },
  span: { size: "span", lineHeight: "span", weight: 400 },
  label: { size: "label", lineHeight: "label", weight: 400 },
};

type BaseProps = TypographyProps & { $variant: TypographyVariant };

// TODO: Add default font and color
const textBaseStyles = css<BaseProps>`
  font-weight: ${({ weight, $variant }) => weight ?? DEFAULTS[$variant].weight};
  color: ${({ color, theme }) => (typeof color === "function" ? color(theme) : (color ?? "inherit"))};
  text-align: ${({ align, $variant }) => align ?? DEFAULTS[$variant].align ?? "left"};
  vertical-align: ${({ verticalAlign }) => verticalAlign ?? "middle"};
  letter-spacing: ${({ letterSpacing }) =>
    typeof letterSpacing === "number" ? `${letterSpacing}px` : (letterSpacing ?? "0%")};
  white-space: ${({ whiteSpace }) => whiteSpace};
  font-style: normal;
  font-family: var(--inter), sans-serif;

  font-size: ${({ size, $variant }) => {
    if (size && size in sizeMap) {
      return sizeMap[size as SizeKey];
    }
    if (size) return size;
    return typographyVariantSizeMap[DEFAULTS[$variant].size].size;
  }};

  line-height: ${({ lineHeight, size, $variant }) => {
    if (lineHeight != null) {
      return typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight;
    }
    if (size && size in lineHeightMap) {
      return lineHeightMap[size as LineHeightKey];
    }
    return typographyVariantSizeMap[DEFAULTS[$variant].lineHeight].lineHeight;
  }};
  text-transform: ${({ texttransform }) => texttransform ?? undefined};
`;

const BaseText = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "color",
      "weight",
      "align",
      "verticalAlign",
      "letterSpacing",
      "size",
      "lineHeight",
      "$variant",
      "texttransform",
      "whiteSpace",
      "css",
    ].includes(prop as string),
})<BaseProps>`
  ${textBaseStyles}
`;

export const createVariant = (variant: TypographyVariant, tag: KnownTarget) => {
  const Styled = styled(BaseText).attrs({ as: tag, $variant: variant })<TypographyProps>``;
  const Comp: React.FC<TypographyProps> = (props) => <Styled as={tag} $variant={variant} {...props} />;
  return Comp;
};

const H1 = createVariant("h1", "h1");
const H2 = createVariant("h2", "h2");
const H3 = createVariant("h3", "h3");
const H4 = createVariant("h4", "h4");
const H5 = createVariant("h5", "h5");
const H6 = createVariant("h6", "h6");
const P = createVariant("p", "p");
const Span = createVariant("span", "span");
const Label = createVariant("label", "label");

H1.displayName = "Typography.H1";
H2.displayName = "Typography.H2";
H3.displayName = "Typography.H3";
H4.displayName = "Typography.H4";
H5.displayName = "Typography.H5";
H6.displayName = "Typography.H6";
P.displayName = "Typography.P";
Span.displayName = "Typography.Span";
Label.displayName = "Typography.Label";

const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Span,
  Label,
};

export default Typography;
