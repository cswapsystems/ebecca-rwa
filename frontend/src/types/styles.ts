import { colors } from "@/styles";

export type Color = FlattenedColors<Colors>;

export type Colors = typeof colors;

// Recursively flatten nested color properties into a union of all HEX Color Codes
type FlattenedColors<ColorsObject> = ColorsObject extends object
  ? {
      [ColorKey in keyof ColorsObject]: FlattenedColors<ColorsObject[ColorKey]>;
    }[keyof ColorsObject]
  : ColorsObject;

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
};

export type ThemeMode = "light" | "dark";

// Extend the Colors Interface to include Theme-specfic Color Properties
export interface ThemeColors extends Colors {
  // Backgrounds for wrappers, containers, sections, cards, etc.
  backgrounds: {
    primary: Color;
    secondary: Color;
    tertiary: Color;
  },
  // Text contents for titles, paragraphs, descriptions, labels, etc.
  texts: {
    primary: Color;
    secondary: Color;
    highlighted: Color;
    positive: Color;
    negative: Color;
    warning: Color;
    info: Color;
    disabled: Color;
  },
  // Links pointing to other websites, pages, sections, and/or routes
  links: {
    primary: Color;
    secondary: Color;
    disabled: Color;
  },
  // Navigation elements inside the app, separated from regular links
  navs: {
    active: {
      default: Color;
      hovered: Color;
      highlighted: Color;
    },
    inactive: {
      default: Color;
      hovered: Color;
    },
  },
  // Outlines for general elements all throughout the app
  borders: {
    primary: Color;
    secondary: Color;
    highlighted: Color;
  },
  // Table colors for headers, rows and/or columns, etc.
  tables: {
    header: Color;
    row: {
      odd: Color;
      even: Color;
      hovered: Color;
    },
  },
  // Button-related styling from backgrounds, to texts, to outlines, to shadows and/or glows
  buttons: {
    // Primary Button
    primary: {
      backgrounds: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
      texts: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
      outlines: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
    },
    // Secondary Button
    secondary: {
      backgrounds: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
      texts: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
      outlines: {
        all?: Color;
        default?: Color;
        focused?: Color;
        hovered?: Color;
        pressed?: Color;
        disabled?: Color;
      },
    },
  },
  // Pill-related colors based on status and other factors
  pills: {
    positive: {
      background: Color;
      text: Color;
    },
    negative: {
      background: Color;
      text: Color;
    },
    warning: {
      background: Color;
      text: Color;
    },
    info: {
      background: Color;
      text: Color;
    },
  },
};
