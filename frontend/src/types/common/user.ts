import { ThemeMode } from "@/types";

// Prefixed with "Session" to provide distinction from 'User' (Backend Schema) above
export interface SessionUser {
  account: UserAccount;
  preferences: UserPreferences;
};

export type UserAccount = {
  userId: string;
  emailAddress: string;
  fullName: string;
  username: string;
  kycStatus: UserKycStatus | null;
  isVerified: boolean;
  isLoggedIn: boolean;
};

export type UserPreferences = {
  theme: ThemeMode;
};

export type UserKycStatus = "Not Submitted" | "Pending" | "Approved" | "Rejected";
