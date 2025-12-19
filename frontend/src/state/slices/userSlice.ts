import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionUser, UserAccount, UserKycStatus, ThemeMode } from "@/types";
import type { AuthUser, AuthSession } from "@/lib/auth";

interface ExtendedSessionUser extends SessionUser {
  auth: {
    user: AuthUser | null;
    isLoading: boolean;
    session: AuthSession | null;
  };
}

const initialState: ExtendedSessionUser = {
  account: {
    userId: "",
    emailAddress: "",
    fullName: "",
    username: "",
    kycStatus: null,
    isVerified: false,
    isLoggedIn: false,
  },
  preferences: {
    theme: "light",
  },
  auth: {
    user: null,
    isLoading: true,
    session: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<UserKycStatus>) => {
      state.account.kycStatus = action.payload;
    },
    updateTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.preferences.theme = action.payload;
    },
    login: (state, action: PayloadAction<UserAccount>) => {
      state.account = {
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logout: (state) => {
      state.account = initialState.account;
      state.auth.user = null;
      state.auth.session = null;
    },
    // Auth state actions
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.auth.user = action.payload;
      if (action.payload) {
        // Sync auth user to account
        state.account.userId = action.payload.userId;
        state.account.emailAddress = action.payload.email || action.payload.username || "";
        state.account.fullName = action.payload.fullName || "";
        state.account.username = action.payload.username;
        state.account.isLoggedIn = true;
      }
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.auth.isLoading = action.payload;
    },
    setAuthSession: (state, action: PayloadAction<AuthSession | null>) => {
      state.auth.session = action.payload;
    },
  },
});

export const { updateStatus, updateTheme, login, logout, setAuthUser, setAuthLoading, setAuthSession } =
  userSlice.actions;

export default userSlice.reducer;
