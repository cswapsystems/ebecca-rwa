import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/state/store";

import { useUser } from "./userHook";
import { useAsset } from "./assetHook";
import { useMint } from "./mintHook";

// Base Hooks - Use throughout the app instead of plain "useSelector" and "useDispatch"
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// State-specific Hooks - Use on sections of the app that need to interact with the global state/s
export {
  useUser,
  useAsset,
  useMint,
  // Other state-specific hooks
};
