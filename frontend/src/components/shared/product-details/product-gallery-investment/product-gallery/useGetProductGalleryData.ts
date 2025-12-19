"use client";

import { useMemo } from "react";

import type { ProductGalleryDataDTO, ProductGalleryProps } from "./types";

type UseGetProductGalleryData = (galleryData?: ProductGalleryProps["imageGalleryData"]) => Array<ProductGalleryDataDTO>;

const usedProductGalleryIds = new Set<number>();

export function generateUniqueProductGalleryId(): string {
  try {
    let id: number;

    do {
      id = Math.floor(Math.random() * 1000) + 1;
    } while (usedProductGalleryIds.has(id));

    usedProductGalleryIds.add(id);

    return id.toString();
  } catch (error) {
    console.warn("Error generating unique cart product ID:", error);
    return "0";
  }
}

const useGetProductGalleryData: UseGetProductGalleryData = (galleryData) => {
  const productGalleryData = useMemo<Array<ProductGalleryDataDTO>>(
    () =>
      galleryData ?? [
        {
          id: `product-${generateUniqueProductGalleryId()}`,
          url: "/images/gallery/gallery-photo3.png",
        },
        {
          id: `product-${generateUniqueProductGalleryId()}`,
          url: "/images/gallery/gallery-photo2.png",
        },
        {
          id: `product-${generateUniqueProductGalleryId()}`,
          url: "/images/gallery/gallery-photo1.png",
        },
        {
          id: `product-${generateUniqueProductGalleryId()}`,
          url: "/images/gallery/gallery-photo3.png",
        },
        {
          id: `product-${generateUniqueProductGalleryId()}`,
          url: "/images/gallery/gallery-photo2.png",
        },
      ],
    [galleryData]
  );

  return productGalleryData;
};

export default useGetProductGalleryData;
