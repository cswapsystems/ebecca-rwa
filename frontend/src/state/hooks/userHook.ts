import { useCallback } from "react";
import { UserAccount, UserKycStatus, ThemeMode } from "@/types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { updateStatus, updateTheme, login, logout } from "@/state/slices/userSlice";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.user.account);
  const preferences = useAppSelector((state) => state.user.preferences);

  const updateUserStatus = useCallback(
    (status: UserKycStatus) => dispatch(updateStatus(status)),
    [dispatch]
  );

  const updateUserTheme = useCallback(
    (theme: ThemeMode) => dispatch(updateTheme(theme)),
    [dispatch]
  );

  const loginUser = useCallback(
    (user: UserAccount) => dispatch(login(user)),
    [dispatch]
  );

  const logoutUser = useCallback(
    () => dispatch(logout()),
    [dispatch]
  );

  return {
    account,
    preferences,
    updateUserStatus,
    updateUserTheme,
    loginUser,
    logoutUser,
  };
};
