import { GraphicsPosition } from "@/types";

export interface TextInputRef {
  focus: () => void;
};

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconPosition?: GraphicsPosition;
};
