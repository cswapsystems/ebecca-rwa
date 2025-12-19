import { ThemeMode } from "@/types";
import { lightTheme } from "@/styles/themes";

export const getTheme = (mode: ThemeMode) => {
  switch (mode) {
    // Add cases for other themes
    default:
      return lightTheme;
  };
};

export const isDarkMode = (mode: ThemeMode) => {
  return mode.toLowerCase().startsWith("dark");
};

export const isLightMode = (mode: ThemeMode) => {
  return mode.toLowerCase().startsWith("light");
};

export const convertHEXtoRGBA = (hex: string, opacity: number) => {
  if (!hex || typeof hex !== 'string') {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
