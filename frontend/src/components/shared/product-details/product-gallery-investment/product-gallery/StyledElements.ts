import styled from "styled-components";
import Image from "next/image";

import { ProductGalleryImageSize, type ProductGalleryImageSizeType } from "./types";
import { Grid, Flex } from "@/components/primitives";

import { breakpoints } from "@/constants";

interface StyledProductGalleryImageContainerProps {
  $size: ProductGalleryImageSizeType;
  $isActive?: boolean;
}

const LARGE_IMAGE_SIZE: string = "449px";
const LARGE_IMAGE_SIZE_MOBILE: string = "80dvw";
const SMALL_IMAGE_SIZE: string = "80px";
const SMALL_IMAGE_SIZE_MOBILE: string = "58.77px";

const LARGE_IMAGE_RADIUS: string = "16px";
const LARGE_IMAGE_RADIUS_MOBILE: string = "11.72px";
const SMALL_IMAGE_RADIUS: string = "8px";
const SMALL_IMAGE_RADIUS_MOBILE: string = "5.88px";

const imageSizes = {
  [ProductGalleryImageSize.LARGE]: {
    size: LARGE_IMAGE_SIZE,
    sizeMobile: LARGE_IMAGE_SIZE_MOBILE,
    radius: LARGE_IMAGE_RADIUS,
    radiusMobile: LARGE_IMAGE_RADIUS_MOBILE,
  },
  [ProductGalleryImageSize.SMALL]: {
    size: SMALL_IMAGE_SIZE,
    sizeMobile: SMALL_IMAGE_SIZE_MOBILE,
    radius: SMALL_IMAGE_RADIUS,
    radiusMobile: SMALL_IMAGE_RADIUS_MOBILE,
  },
};

export const StyledProductGalleryImageContainer = styled.div<StyledProductGalleryImageContainerProps>`
  position: relative;
  width: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].size
      : imageSizes[ProductGalleryImageSize.SMALL].size};
  height: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].size
      : imageSizes[ProductGalleryImageSize.SMALL].size};
  border-radius: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].radius
      : imageSizes[ProductGalleryImageSize.SMALL].radius};

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].sizeMobile
        : imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    height: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].sizeMobile
        : imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    border-radius: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].radiusMobile
        : imageSizes[ProductGalleryImageSize.SMALL].radiusMobile};
  }
`;

export const StyledProductGalleryImage = styled(Image)<StyledProductGalleryImageContainerProps>`
  border-radius: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].radius
      : imageSizes[ProductGalleryImageSize.SMALL].radius};
  cursor: pointer;
  object-fit: cover;
  border: ${({ theme, $isActive }) => ($isActive ? `1px solid ${theme.colors.primary500}` : "none")};

  @media only screen and (max-width: ${breakpoints.xs}px) {
    border-radius: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].radiusMobile
        : imageSizes[ProductGalleryImageSize.SMALL].radiusMobile};
  }
`;

export const StyledViewAllImagesWrapper = styled.button<StyledProductGalleryImageContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  inset: 0;
  width: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].size
      : imageSizes[ProductGalleryImageSize.SMALL].size};
  height: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].size
      : imageSizes[ProductGalleryImageSize.SMALL].size};
  border-radius: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].radius
      : imageSizes[ProductGalleryImageSize.SMALL].radius};
  border-radius: ${({ $size }) =>
    $size === ProductGalleryImageSize.LARGE
      ? imageSizes[ProductGalleryImageSize.LARGE].radius
      : imageSizes[ProductGalleryImageSize.SMALL].radius};
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].sizeMobile
        : imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    height: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].sizeMobile
        : imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    border-radius: ${({ $size }) =>
      $size === ProductGalleryImageSize.LARGE
        ? imageSizes[ProductGalleryImageSize.LARGE].radiusMobile
        : imageSizes[ProductGalleryImageSize.SMALL].radiusMobile};
  }
`;

export const StyledModalImageButton = styled.button`
  border: 0;
  background: none;
`;

export const StyledModalSmallImagesGridContainer = styled(Grid.Container)`
  align-self: flex-start;
`;

export const GridImagesContainer = styled(Grid.Container)`
  @media only screen and (max-width: ${breakpoints.xxxs}px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
`;

export const ProductGalleryAddImageButtonWrapper = styled.button`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23E7E7E7FF' stroke-width='3' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: ${imageSizes[ProductGalleryImageSize.SMALL].radius};
  border: none;
  background-color: ${({ theme }) => theme.colors.base50};
  width: ${imageSizes[ProductGalleryImageSize.SMALL].size};
  height: ${imageSizes[ProductGalleryImageSize.SMALL].size};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${breakpoints.xs}px) {
    width: ${imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    height: ${imageSizes[ProductGalleryImageSize.SMALL].sizeMobile};
    border-radius: ${imageSizes[ProductGalleryImageSize.SMALL].radiusMobile};
  }
`;

export const StyledProductGalleryActiveImageEmptyState = styled(Flex.Column)`
  background-color: ${({ theme }) => theme.colors.base100};
  width: 100%;
  height: 380px;
  border-radius: 16px;
`;
