"use client";

import type { FC, JSX, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { useMemo, useEffect } from "react";

import { Flex } from "@/components/primitives";
import ProductGallery from "./product-gallery";
import ProductInvestmentData from "./product-investment-data";
import type { ProductGalleryDataDTO } from "./product-gallery/types";
import { useAsset } from "@/state/hooks";
import type { ProductTagDTO } from "./product-investment-data/useProductInvestmentDataProductTags";
import type { ProductPurchaseInformationProps } from "../product-purchase-information/ProductPurchaseInformation";

import { breakpoints } from "@/constants";

interface ProductGalleryInvestmentCommonProps
  extends Pick<
    ProductPurchaseInformationProps,
    "productPurchaseInformationPrimaryButtonOnClick" | "productPurchaseInformationSecondaryButtonOnClick"
  > {
  onFileChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

interface ProductGalleryInvestmentDetailsPageProps extends ProductGalleryInvestmentCommonProps {
  type: "details-page";
}

interface ProductGalleryInvestmentDetailsAssetProps extends ProductGalleryInvestmentCommonProps {
  type: "asset-wizard";
  valueText: string;
  onValueTextChange: (value: string) => void;
  descriptionText: string;
  onDescriptionTextChange: (value: string) => void;
  detailsText: string;
  onDetailsTextChange: (value: string) => void;
  assetName: string;
  productTags: Array<ProductTagDTO>;
  nameText: string;
  onNameTextChange: (value: string) => void;
}

export type ProductGalleryInvestmentProps =
  | ProductGalleryInvestmentDetailsPageProps
  | ProductGalleryInvestmentDetailsAssetProps;

const ProductGalleryInvestmentFlexWrapper = styled(Flex.Row)`
  column-gap: 28px;
  width: 100%;
  @media only screen and (max-width: 1400px) {
    flex-direction: column;
    row-gap: 28px;
  }
`;

const CardWrapper = styled(Flex.Column)`
  gap: 28px;
  width: 100%;
  border: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 21, 0.075);
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  @media only screen and (max-width: ${breakpoints.l}px) {
    background-color: transparent;
    border-radius: 0px;
    padding: 0px;
    box-shadow: none;
  }
`;

const ProductInfoSummary: FC<ProductGalleryInvestmentProps> = (props): JSX.Element => {
  const { type = "details-page", ...rest } = props;
  const { formDraftImageGalleryData } = useAsset();

  const imageGalleryData = useMemo<Array<ProductGalleryDataDTO> | undefined>(() => {
    if (type !== "asset-wizard") {
      return undefined;
    }

    return formDraftImageGalleryData || undefined;
  }, [type, formDraftImageGalleryData]);

  return (
    <CardWrapper>
      <ProductGalleryInvestmentFlexWrapper>
        {type === "details-page" ? (
          <>
            <ProductGallery imageGalleryData={imageGalleryData} type={type} />
            <ProductInvestmentData type={type} {...rest} />
          </>
        ) : (
          <>
            <ProductGallery imageGalleryData={imageGalleryData} type={type} onFileChange={props.onFileChange} />
            <ProductInvestmentData
              type={type}
              valueText={(props as ProductGalleryInvestmentDetailsAssetProps)?.valueText}
              onValueTextChange={(props as ProductGalleryInvestmentDetailsAssetProps)?.onValueTextChange}
              descriptionText={(props as ProductGalleryInvestmentDetailsAssetProps)?.descriptionText}
              onDescriptionTextChange={(props as ProductGalleryInvestmentDetailsAssetProps)?.onDescriptionTextChange}
              detailsText={(props as ProductGalleryInvestmentDetailsAssetProps)?.detailsText}
              onDetailsTextChange={(props as ProductGalleryInvestmentDetailsAssetProps)?.onDetailsTextChange}
              assetName={(props as ProductGalleryInvestmentDetailsAssetProps)?.assetName}
              products={(props as ProductGalleryInvestmentDetailsAssetProps)?.productTags}
              nameText={(props as ProductGalleryInvestmentDetailsAssetProps)?.nameText}
              onNameTextChange={(props as ProductGalleryInvestmentDetailsAssetProps)?.onNameTextChange}
              {...rest}
            />
          </>
        )}
      </ProductGalleryInvestmentFlexWrapper>
    </CardWrapper>
  );
};

export default ProductInfoSummary;
