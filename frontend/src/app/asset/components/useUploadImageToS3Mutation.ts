"use client";

import { useCallback, useState } from "react";

import type { UploadImageSuccessResult } from "@/app/api/upload-image/route";

type UseUploadImageToS3Mutation = () => {
  mutate: (file: File) => Promise<UploadImageSuccessResult | null>;
  mutateMultiple: (files: File[]) => Promise<UploadImageSuccessResult[] | null>;
  isLoading: boolean;
};

const useUploadImageToS3Mutation: UseUploadImageToS3Mutation = () => {
  const [isLoading, setLoading] = useState(false);

  const mutate = useCallback(async (file: File): Promise<UploadImageSuccessResult | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.info("Error uploading image: ", error);
      return null;
    }
  }, []);

  const mutateMultiple = useCallback(
    async (files: File[]): Promise<Array<UploadImageSuccessResult> | null> => {
      setLoading(true);
      try {
        const results = await Promise.all(files.map((file) => mutate(file)));
        if (!results) {
          return null;
        }
        return results as unknown as UploadImageSuccessResult[];
      } catch (error) {
        console.info("Error uploading multiple images: ", error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [mutate, setLoading]
  );

  return { mutate, mutateMultiple, isLoading };
};

export default useUploadImageToS3Mutation;
