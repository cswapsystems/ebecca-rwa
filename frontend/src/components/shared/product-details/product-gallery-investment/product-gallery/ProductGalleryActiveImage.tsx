"use client";

import type { FC, JSX } from "react";
import { memo, useRef } from "react";
import Image from "next/image";

import { Button } from "@/components/common";

import { useProductGalleryContext } from "./context";
import { useAsset } from "@/state/hooks";
import ProductGalleryImage from "./ProductGalleryImage";
import { ProductGalleryImageSize } from "./types";
import { StyledProductGalleryActiveImageEmptyState } from "./StyledElements";
import type { ProductDetailsComponentType } from "../../ProductDetails";

interface Props {
  type: ProductDetailsComponentType;
  onFileChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductGalleryActiveImage: FC<Props> = ({ type, onFileChange }): JSX.Element | null => {
  const { activeImage } = useProductGalleryContext();
  const { formDraftImageGalleryData: imageGalleryData } = useAsset();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImageClick = (): void => {
    inputRef.current?.click?.();
  };

  if (!activeImage || (type === "asset-wizard" && (!imageGalleryData || imageGalleryData.length === 0))) {
    return (
      <>
        <StyledProductGalleryActiveImageEmptyState alignItems="center" justifyContent="center" rowGap="24px">
          <Image
            src="/icons/image-placeholder-icon.svg"
            width={70}
            height={60}
            alt="Upload an image"
            unoptimized
            style={{ objectFit: "cover" }}
          />
          <Button
            variant="primary"
            iconPosition="left"
            icon={<Image src="/icons/plus-white.svg" width={12} height={12} alt="Add an image" unoptimized />}
            fontSize="18px"
            onClick={handleAddImageClick}
          >
            Add an image
          </Button>
        </StyledProductGalleryActiveImageEmptyState>
        <input
          ref={inputRef}
          type="file"
          onChange={(evt) => {
            onFileChange?.(evt);
          }}
          multiple
          accept={"/image*"}
          style={{ display: "none" }}
        />
      </>
    );
  }

  return <ProductGalleryImage size={ProductGalleryImageSize.LARGE} src={activeImage.url} />;
};

export default memo(ProductGalleryActiveImage);
