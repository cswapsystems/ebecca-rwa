import "styled-components";
import { Theme, ThemeMode, ThemeColors } from "@/types";

/*
  Provides DefaultTheme (from "styled-components")
  with a custom structure extending from
  Theme (from "@/types")
*/
declare module "styled-components" {
  export interface DefaultTheme extends Theme { mode: ThemeMode, colors: ThemeColors }
};
