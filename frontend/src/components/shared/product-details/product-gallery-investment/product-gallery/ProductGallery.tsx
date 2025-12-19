"use client";

import type { FC, JSX } from "react";
import styled from "styled-components";

import ProductGalleryProvider from "./context";
import { Flex } from "@/components/primitives";
import ProductGallerySmallImagesList from "./ProductGallerySmallImagesList";
import ProductGalleryActiveImage from "./ProductGalleryActiveImage";
import type { ProductGalleryProps } from "./types";

import useSetDefaultActiveProductGalleryImage from "./useSetDefaultActiveProductGalleryImage";

import { breakpoints } from "@/constants";

const ProductGalleryChildWrapper = styled(Flex.Row)`
  flex: 1;
  @media only screen and (max-width: ${breakpoints.l}px) {
    align-items: center;
    justify-content: center;
  }
`;

const ProductGalleryChild: FC<ProductGalleryProps> = ({ imageGalleryData, type, onFileChange }): JSX.Element => {
  useSetDefaultActiveProductGalleryImage(type);
  return (
    <ProductGalleryChildWrapper columnGap="28px" directionMobile="column-reverse" rowGap="28px">
      {type === "asset-wizard" ? (
        <ProductGallerySmallImagesList {...{ imageGalleryData, type: "asset-wizard", onFileChange }} />
      ) : (
        <ProductGallerySmallImagesList {...{ imageGalleryData, type: "details-page" }} />
      )}
      <ProductGalleryActiveImage type={type} onFileChange={onFileChange} />
    </ProductGalleryChildWrapper>
  );
};

const ProductGallery: FC<ProductGalleryProps> = ({ imageGalleryData, type, onFileChange }): JSX.Element => {
  return (
    <ProductGalleryProvider>
      {type === "asset-wizard" ? (
        <ProductGalleryChild {...{ imageGalleryData, type: "asset-wizard", onFileChange }} />
      ) : (
        <ProductGalleryChild {...{ imageGalleryData, type: "details-page" }} />
      )}
    </ProductGalleryProvider>
  );
};

export default ProductGallery;
