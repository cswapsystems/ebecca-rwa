"use client";

import {
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  signOut as amplifySignOut,
  confirmSignUp as amplifyConfirmSignUp,
  resendSignUpCode as amplifyResendSignUpCode,
  getCurrentUser as amplifyGetCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  updatePassword,
  resetPassword,
  confirmResetPassword,
  type SignInOutput,
  type SignUpOutput,
  type ConfirmSignUpOutput,
  type ResendSignUpCodeOutput,
} from "aws-amplify/auth";

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignUpInput {
  username: string;
  password: string;
  options?: {
    userAttributes?: {
      email?: string;
      name?: string;
    };
    autoSignIn?: boolean;
  };
}

export interface ConfirmSignUpInput {
  username: string;
  confirmationCode: string;
}

export interface ResendSignUpCodeInput {
  username: string;
}

export interface AuthUser {
  userId: string;
  username: string;
  email?: string;
  fullName?: string;
  signInDetails?: {
    loginId?: string;
    authFlowType?: string;
  };
}

/**
 * Sign in a user with email and password
 */
export async function signIn(input: SignInInput): Promise<SignInOutput> {
  try {
    const output = await amplifySignIn({
      username: input.username,
      password: input.password,
    });
    return output;
  } catch (error) {
    throw handleAuthError(error);
  }
}

/**
 * Sign up a new user
 */
export async function signUp(input: SignUpInput): Promise<SignUpOutput> {
  try {
    const output = await amplifySignUp({
      username: input.username,
      password: input.password,
      options: input.options
        ? {
            userAttributes: input.options.userAttributes as Record<string, string>,
            autoSignIn: input.options.autoSignIn,
          }
        : undefined,
    });
    return output;
  } catch (error) {
    throw handleAuthError(error);
  }
}

/**
 * Confirm sign up with verification code
 */
export async function confirmSignUp(input: ConfirmSignUpInput): Promise<ConfirmSignUpOutput> {
  try {
    const output = await amplifyConfirmSignUp({
      username: input.username,
      confirmationCode: input.confirmationCode,
    });
    return output;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function resendSignUpCode(input: ResendSignUpCodeInput): Promise<ResendSignUpCodeOutput> {
  try {
    const output = await amplifyResendSignUpCode({
      username: input.username,
    });
    return output;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function signOut(): Promise<void> {
  try {
    await amplifySignOut();
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await amplifyGetCurrentUser();

    let email: string | undefined;
    let fullName: string | undefined;

    try {
      const attributes = await fetchUserAttributes();
      email = attributes.email;
      fullName = attributes.name;
    } catch {
      // Silent fail for attribute fetch
    }

    return {
      userId: user.userId,
      username: user.username,
      email: email || user.username,
      fullName: fullName,
      signInDetails: user.signInDetails,
    };
  } catch {
    return null;
  }
}

export async function getAuthSession() {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (err) {
    throw handleAuthError(err);
  }
}

export type AuthSession = Record<string, unknown>;

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  try {
    await updatePassword({
      oldPassword,
      newPassword,
    });
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function requestPasswordReset(username: string): Promise<void> {
  try {
    await resetPassword({ username });
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function confirmPasswordReset(
  username: string,
  confirmationCode: string,
  newPassword: string
): Promise<void> {
  try {
    await confirmResetPassword({
      username,
      confirmationCode,
      newPassword,
    });
  } catch (error) {
    throw handleAuthError(error);
  }
}

function handleAuthError(error: unknown): Error {
  if (error instanceof Error) {
    // Check for common AWS Cognito error names
    const errorName = (error as Error & { name?: string }).name;
    if (errorName) {
      switch (errorName) {
        case "NotAuthorizedException":
          return new Error("Incorrect username or password.");
        case "UserNotConfirmedException":
          return new Error("User account is not confirmed. Please verify your email.");
        case "UsernameExistsException":
          return new Error("An account with this email already exists.");
        case "InvalidPasswordException":
          return new Error("Password does not meet requirements.");
        case "CodeMismatchException":
          return new Error("Invalid verification code.");
        case "ExpiredCodeException":
          return new Error("Verification code has expired. Please request a new one.");
        case "LimitExceededException":
          return new Error("Too many attempts. Please try again later.");
        case "UserNotFoundException":
          return new Error("User not found.");
        default:
          return new Error(error.message || "An authentication error occurred.");
      }
    }
    return error;
  }
  return new Error("An unexpected error occurred.");
}
