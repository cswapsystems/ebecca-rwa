import type { InputHTMLAttributes } from "react";

export enum ProductGalleryImageSize {
  SMALL = "small",
  LARGE = "large",
}

export type ProductGalleryImageSizeType = ProductGalleryImageSize;

export interface ProductGalleryDataDTO {
  id: string;
  url: string;
}

export interface ProductGalleryCommonProps {
  imageGalleryData?: Array<ProductGalleryDataDTO>;
}

export interface ProductGalleryDetailsPageProps extends ProductGalleryCommonProps {
  type: "details-page";
  onFileChange?: never;
}

export interface ProductGalleryAssetWizardProps extends ProductGalleryCommonProps {
  type: "asset-wizard";
  onFileChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export type ProductGalleryProps = ProductGalleryDetailsPageProps | ProductGalleryAssetWizardProps;
