"use client";

import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  signOut as amplifySignOut,
  confirmSignUp as amplifyConfirmSignUp,
  resendSignUpCode as amplifyResendSignUpCode,
  getCurrentUser,
  getAuthSession,
  type SignInInput,
  type SignUpInput,
  type ConfirmSignUpInput,
  type AuthUser,
  type AuthSession,
} from "@/lib/auth";
import { setAuthUser, setAuthLoading, setAuthSession, logout } from "@/state/slices/userSlice";

export interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  confirmSignUp: (input: ConfirmSignUpInput) => Promise<void>;
  resendSignUpCode: (username: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  session: Awaited<ReturnType<typeof getAuthSession>> | null;
}

export function useAuth(): UseAuthReturn {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  // Safety check: handle case where auth property might not exist (e.g., old persisted state)
  const auth = userState?.auth || { user: null, isLoading: true, session: null };
  const { user, isLoading, session } = auth;

  const checkAuth = useCallback(async () => {
    try {
      dispatch(setAuthLoading(true));
      const currentUser = await getCurrentUser();
      dispatch(setAuthUser(currentUser));

      if (currentUser) {
        console.log("User:", currentUser);
        try {
          const authSession = await getAuthSession();
          dispatch(setAuthSession(authSession as AuthSession));
        } catch {
          // Silent fail for session fetch
        }
      } else {
        dispatch(setAuthSession(null));
      }
    } catch {
      dispatch(setAuthUser(null));
      dispatch(setAuthSession(null));
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch]);

  // Load current user on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSignIn = useCallback(
    async (input: SignInInput) => {
      try {
        await amplifySignIn(input);
        await checkAuth();
      } catch (error) {
        throw error;
      }
    },
    [checkAuth]
  );

  const handleSignUp = useCallback(async (input: SignUpInput) => {
    try {
      await amplifySignUp(input);
      // Don't automatically check auth after signup since user needs to confirm
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await amplifySignOut();
      dispatch(logout());
      dispatch(setAuthUser(null));
      dispatch(setAuthSession(null));
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const handleConfirmSignUp = useCallback(
    async (input: ConfirmSignUpInput) => {
      try {
        await amplifyConfirmSignUp(input);
        await checkAuth();
      } catch (error) {
        throw error;
      }
    },
    [checkAuth]
  );

  const handleResendSignUpCode = useCallback(async (username: string) => {
    try {
      await amplifyResendSignUpCode({ username });
    } catch (error) {
      throw error;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    confirmSignUp: handleConfirmSignUp,
    resendSignUpCode: handleResendSignUpCode,
    refreshUser,
    session: session as AuthSession | null,
  };
}
