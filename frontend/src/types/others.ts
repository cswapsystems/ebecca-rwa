export interface Nav {
  href: string;
  icon: string;
  label: string;
  target?: string;
};

export interface Social {
  name: string;
  icon: string;
  link: string;
};

export interface Breakpoints {
  xxxs: number;
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  xxxl: number;
  xxxxl: number;
};

export type Variant = 'primary' | 'secondary' | 'earning';

export type SortDirection = "ASC" | "DESC";

export type GraphicsPosition = 'left' | 'right';
