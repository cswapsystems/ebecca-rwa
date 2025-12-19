"use client";

import type { FC, JSX, InputHTMLAttributes, ChangeEvent } from "react";

import { BaseStyledProductDetailsContainer } from "./ProductDetailElements";
import { Flex } from "@/components/primitives";
import ProductDetailsContentContainer from "./ProductDetailsContentContainer";
import ProductGalleryInvestment from "./product-gallery-investment";
import ProductPurchaseInformation from "./product-purchase-information";
import type { ProductPurchaseInformationProps } from "./product-purchase-information/ProductPurchaseInformation";
import PageBackButton from "@/components/common/buttons/PageBackButton";
import type { ProductTagDTO } from "./product-gallery-investment/product-investment-data/useProductInvestmentDataProductTags";

import type { ProductGalleryDataDTO } from "./product-gallery-investment/product-gallery/types";

export type ProductDetailsComponentType = "details-page" | "asset-wizard";

type CommonProductPuchaseInformationProps = Pick<
  ProductPurchaseInformationProps,
  | "isPrimaryButtonDisabled"
  | "productAddress"
  | "productFractionalizedUnit"
  | "productTotalPrice"
  | "productPurchaseInformationPrimaryButtonOnClick"
  | "productPurchaseInformationSecondaryButtonOnClick"
>;

interface ProductDetailsAssetsProps extends CommonProductPuchaseInformationProps {
  type: "asset-wizard";
  productId?: never;
  imageGalleryData?: Array<ProductGalleryDataDTO>;
  valueText: string;
  onValueTextChange: (value: string) => void;
  descriptionText: string;
  onDescriptionTextChange: (value: string) => void;
  detailsText: string;
  onDetailsTextChange: (value: string) => void;
  onBackButtonClick?: () => void;
  onUploadImageChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  assetName: string;
  productTags: Array<ProductTagDTO>;
  nameText: string;
  onNameTextChange: (value: string) => void;
  productDescriptionValue: string;
}

interface ProductDetailsPageProps extends CommonProductPuchaseInformationProps {
  type: "details-page";
  productId: string;
  imageGalleryData?: never;
  onBackButtonClick?: () => void;
  onUploadImageChange?: never;
}

export type ProductDetailsProps = ProductDetailsAssetsProps | ProductDetailsPageProps;

const ProductDetails: FC<ProductDetailsProps> = ({
  productId,
  type,
  imageGalleryData,
  productAddress,
  productTotalPrice,
  productFractionalizedUnit,
  isPrimaryButtonDisabled,
  productPurchaseInformationPrimaryButtonOnClick,
  productPurchaseInformationSecondaryButtonOnClick,
  onBackButtonClick,
  onUploadImageChange,
  ...rest
}): JSX.Element => {
  if (type === "details-page") {
    return (
      <BaseStyledProductDetailsContainer>
        <Flex.Column rowGap="16px">
          <PageBackButton onClick={onBackButtonClick} />
          <ProductDetailsContentContainer>
            <ProductGalleryInvestment type="details-page" />
            <ProductPurchaseInformation
              type={type}
              productAddress={productAddress}
              productTotalPrice={productTotalPrice}
              productFractionalizedUnit={productFractionalizedUnit}
              isPrimaryButtonDisabled={isPrimaryButtonDisabled}
              productPurchaseInformationPrimaryButtonOnClick={productPurchaseInformationPrimaryButtonOnClick}
              productPurchaseInformationSecondaryButtonOnClick={productPurchaseInformationSecondaryButtonOnClick}
            />
          </ProductDetailsContentContainer>
        </Flex.Column>
      </BaseStyledProductDetailsContainer>
    );
  }
  return (
    <Flex.Column rowGap="16px" padding="60px 0px">
      <PageBackButton onClick={onBackButtonClick} />
      <ProductDetailsContentContainer>
        <ProductGalleryInvestment
          type={type}
          productPurchaseInformationPrimaryButtonOnClick={productPurchaseInformationPrimaryButtonOnClick}
          productPurchaseInformationSecondaryButtonOnClick={productPurchaseInformationSecondaryButtonOnClick}
          valueText={(rest as ProductDetailsAssetsProps)?.valueText}
          onValueTextChange={(rest as ProductDetailsAssetsProps)?.onValueTextChange}
          descriptionText={(rest as ProductDetailsAssetsProps)?.descriptionText}
          onDescriptionTextChange={(rest as ProductDetailsAssetsProps)?.onDescriptionTextChange}
          detailsText={(rest as ProductDetailsAssetsProps)?.detailsText}
          onDetailsTextChange={(rest as ProductDetailsAssetsProps)?.onDetailsTextChange}
          onFileChange={(evt) => {
            onUploadImageChange?.(evt);
          }}
          assetName={(rest as ProductDetailsAssetsProps)?.assetName}
          productTags={(rest as ProductDetailsAssetsProps)?.productTags}
          nameText={(rest as ProductDetailsAssetsProps)?.nameText}
          onNameTextChange={(rest as ProductDetailsAssetsProps)?.onNameTextChange}
        />
        <ProductPurchaseInformation
          type={type}
          productDescriptionValue={(rest as ProductDetailsAssetsProps)?.productDescriptionValue}
          productAddress={productAddress}
          productTotalPrice={productTotalPrice}
          productFractionalizedUnit={productFractionalizedUnit}
          isPrimaryButtonDisabled={isPrimaryButtonDisabled}
          productPurchaseInformationPrimaryButtonOnClick={productPurchaseInformationPrimaryButtonOnClick}
          productPurchaseInformationSecondaryButtonOnClick={productPurchaseInformationSecondaryButtonOnClick}
        />
      </ProductDetailsContentContainer>
    </Flex.Column>
  );
};

export default ProductDetails;
