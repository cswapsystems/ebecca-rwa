/*
  NOTE:
    All types prefixed with "Session" are used for State Management purposes (e.g. User vs SessionUser)
    This will provide distinction between:
      A. Types referencing the Amplify Schema, and
      B. Types persisting on the Global State
*/

// Types referencing the Amplify Schema for Backend Integration
import {
  Admin,
  User,
  Category,
  Subcategory,
  Tag,
  SubcategoryTag,
  AssetType,
  AssetField,
  AssetMetadata,
  Asset,
  AssetFraction,
  CartItem,
  PaymentMethod,
  Order,
  Transaction,
  Notification,
  ActivityLog,
} from "./schema";

// Types persisting on the Global State for Frontend State Management
import { SessionUser, UserAccount, UserKycStatus, UserPreferences } from "./common";

// Types related to Styles
import { Color, Colors, Theme, ThemeMode, ThemeColors } from "./styles";

// Types used by Components
import {
  PieStore,
  UsePieInternals,
  TextInputRef,
  DropdownOption,
  Carousel,
  CarouselNavigation,
  UseCarouselDot,
  UseCarouselPrevNext,
} from "./components";

// Other Types
import { Nav, Social, Variant, Breakpoints, SortDirection, GraphicsPosition } from "./others";

import type { MintingRequestDTO, MintingRequestFilesDTO, MintingRequestMetadataDTO, MintingResponseDTO } from "./mint";

export type {
  // Schema
  Admin,
  User,
  Category,
  Subcategory,
  Tag,
  SubcategoryTag,
  AssetType,
  AssetField,
  AssetMetadata,
  Asset,
  AssetFraction,
  CartItem,
  PaymentMethod,
  Order,
  Transaction,
  Notification,
  ActivityLog,
  // Common
  SessionUser,
  UserAccount,
  UserKycStatus,
  UserPreferences,
  // Styles
  Color,
  Colors,
  Theme,
  ThemeMode,
  ThemeColors,
  // Components
  PieStore,
  UsePieInternals,
  TextInputRef,
  DropdownOption,
  Carousel,
  CarouselNavigation,
  UseCarouselDot,
  UseCarouselPrevNext,
  // Others
  Nav,
  Social,
  Variant,
  Breakpoints,
  SortDirection,
  GraphicsPosition,
  // Mint
  MintingRequestDTO,
  MintingRequestFilesDTO,
  MintingRequestMetadataDTO,
  MintingResponseDTO,
};
