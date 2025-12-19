"use client";

import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "./index";

import type { MintState } from "../slices/mintSlice";
import { updateMintJobId } from "../slices/mintSlice";

interface MintReturn extends MintState {
  updateJobId: (jobId: string | null) => void;
}

type UseMint = () => MintReturn;

export const useMint: UseMint = () => {
  const dispatch = useAppDispatch();

  const mintJobId = useAppSelector((state) => state.mint.mintJobId);

  const updateJobId = useCallback(
    (data: string | null): void => {
      dispatch(updateMintJobId(data));
    },
    [dispatch]
  );

  return {
    mintJobId,
    updateJobId,
  };
};
