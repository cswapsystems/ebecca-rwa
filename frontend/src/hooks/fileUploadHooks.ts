"use client";

import { useMemo } from "react";

import { MAX_FILE_SIZE_BYTES } from "@/constants";

type UseGetMaxFileSizeMB = () => string;

export const useGetMaxFileSizeMB: UseGetMaxFileSizeMB = () => {
  return useMemo<string>(() => {
    const bytes = MAX_FILE_SIZE_BYTES;
    return bytes / (1024 * 1024) + " MB";
  }, []);
};
