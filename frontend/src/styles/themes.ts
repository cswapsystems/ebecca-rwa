import { Theme } from '@/types';
import { colors } from '@/styles';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    // Backgrounds for wrappers, containers, sections, cards, etc.
    backgrounds: {
      primary: colors.base50,
      secondary: colors.white,
      tertiary: colors.primary950,
    },
    // Text contents for titles, paragraphs, descriptions, labels, etc.
    texts: {
      primary: colors.base950,
      secondary: colors.base500,
      highlighted: colors.primary500,
      positive: colors.positive500,
      negative: colors.negative500,
      warning: colors.warning500,
      info: colors.info500,
      disabled: colors.base300,
    },
    // Links pointing to other websites, pages, sections, and/or routes
    links: {
      primary: colors.primary500,
      secondary: colors.primary800,
      disabled: colors.base300,
    },
    // Navigation elements inside the app, separated from regular links
    navs: {
      active: {
        default: colors.base900,
        hovered: colors.base600,
        highlighted: colors.primary500,
      },
      inactive: {
        default: colors.base700,
        hovered: colors.base600,
      },
    },
    // Outlines for general elements all throughout the app
    borders: {
      primary: colors.base200,
      secondary: colors.base100,
      highlighted: colors.primary500,
    },
    // Table colors for headers, rows and/or columns, etc.
    tables: {
      header: colors.primary500,
      row: {
        odd: colors.base100,
        even: colors.white,
        hovered: colors.base200,
      },
    },
    // Button-related styling from backgrounds, to texts, to outlines, to shadows and/or glows
    buttons: {
      // Primary Button
      primary: {
        backgrounds: {
          default: colors.primary500,
          focused: colors.primary500,
          hovered: colors.primary600,
          pressed: colors.primary700,
          disabled: colors.primary200,
        },
        texts: {
          all: colors.white, // Shared by all States
        },
        outlines: {
          default: colors.primary500,
          focused: colors.primary500,
          hovered: colors.primary600,
          pressed: colors.primary700,
          disabled: colors.primary200,
        },
      },
      // Secondary Button
      secondary: {
        backgrounds: {
          default: colors.transparent,
          focused: colors.transparent,
          hovered: colors.base100,
          pressed: colors.base200,
          disabled: colors.base100,
        },
        texts: {
          all: colors.base800, // Shared by all States except for Disabled
          disabled: colors.base300,
        },
        outlines: {
          all: colors.base800, // Shared by all States except for Disabled
          disabled: colors.base300,
        },
      },
    },
    // Pill-related colors based on status and other factors
    pills: {
      positive: {
        background: colors.positive100,
        text: colors.positive700,
      },
      negative: {
        background: colors.negative100,
        text: colors.negative700,
      },
      warning: {
        background: colors.warning200,
        text: colors.warning900,
      },
      info: {
        background: colors.info300,
        text: colors.info900,
      },
    },
    // Direct access to the entire color palette
    ...colors,
  },
};

/* Dark Mode will be enabled once available */
/* Need to derive theme colors from designs */
// export const darkTheme: Theme = {
//   mode: 'dark',
//   colors: {
//     // Direct access to the entire color palette
//     ...colors,
//   },
// };
