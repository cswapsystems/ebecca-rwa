"use client";

import { useEffect } from "react";

import useGetProductGalleryData from "./useGetProductGalleryData";
import { useProductGalleryContext } from "./context";
import { useAsset } from "@/state/hooks";

import type { ProductDetailsComponentType } from "../../ProductDetails";

// This hook will set the default active image in the product gallery when the component mounts and if no image is active yet.

type UseSetDefaultActiveProductGalleryImage = (type: ProductDetailsComponentType) => void;

const useSetDefaultActiveProductGalleryImage: UseSetDefaultActiveProductGalleryImage = (type) => {
  const { activeImage, setActiveImage } = useProductGalleryContext();
  const { formDraftImageGalleryData: ctxImageGalleryData } = useAsset();
  const productGalleryData = useGetProductGalleryData();

  useEffect(() => {
    if (!activeImage && ctxImageGalleryData && ctxImageGalleryData?.length > 0 && type === "asset-wizard") {
      setActiveImage(ctxImageGalleryData?.at?.(0) ?? null);
    }
    if (type === "details-page" && !activeImage) {
      setActiveImage(productGalleryData?.at?.(0) ?? null);
    }
  }, [activeImage, setActiveImage, ctxImageGalleryData, type, productGalleryData]);
};

export default useSetDefaultActiveProductGalleryImage;
