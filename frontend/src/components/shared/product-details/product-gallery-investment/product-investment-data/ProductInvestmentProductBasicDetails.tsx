"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";
import Image from "next/image";

import { Typography, TextInput } from "@/components/common";
import { Flex } from "@/components/primitives";
import ProductInvestmentDataProductTags from "./ProductInvestmentDataProductTags";
import type { ProductTagDTO } from "./useProductInvestmentDataProductTags";

import { priceFormatter } from "@/utils";

interface ProductInvestmentProductBasicDetailsCommonProps {
  productAddress: string;
  productFractionalizedUnit?: string;
}

interface ProductInvestmentProductBasicDetailsPropsDetailsType extends ProductInvestmentProductBasicDetailsCommonProps {
  type: "details-page";
  productPrice: number;
}

interface ProductInvestmentProductBasicDetailsPropsAssetType extends ProductInvestmentProductBasicDetailsCommonProps {
  type: "asset-wizard";
  valueText: string;
  onValueTextChange: (value: string) => void;
  products: Array<ProductTagDTO>;
  nameText: string;
  onNameTextChange: (value: string) => void;
}

type ProductInvestmentProductBasicDetailsProps =
  | ProductInvestmentProductBasicDetailsPropsDetailsType
  | ProductInvestmentProductBasicDetailsPropsAssetType;

const ProductInvestmentProductBasicDetails: FC<ProductInvestmentProductBasicDetailsProps> = (props): JSX.Element => {
  const { type } = props;
  const productBasicDetails = useMemo<ProductInvestmentProductBasicDetailsProps>(() => {
    if (type === "asset-wizard") {
      return {
        productAddress: props?.productAddress,
        productFractionalizedUnit: props?.productFractionalizedUnit,
        type,
        valueText: props?.valueText,
        onValueTextChange: props?.onValueTextChange,
        products: props?.products,
        nameText: props?.nameText,
        onNameTextChange: props?.onNameTextChange,
      };
    }
    return {
      productAddress: props?.productAddress,
      productFractionalizedUnit: props?.productFractionalizedUnit,
      type,
      productPrice: props?.productPrice,
    };
  }, [props, type]);

  return (
    <Flex.Column rowGap="8px" alignItems="flex-start">
      {type === "details-page" ? (
        <Typography.H4 size="20px" weight={700} lineHeight={26} color={(theme) => theme.colors.base950}>
          {productBasicDetails?.productAddress}
        </Typography.H4>
      ) : (
        <TextInput
          value={props?.nameText}
          onChange={(evt) => props?.onNameTextChange(evt?.target?.value)}
          placeholder="Name"
        />
      )}
      {productBasicDetails?.productFractionalizedUnit && (
        <Typography.Span weight={500} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
          {productBasicDetails.productFractionalizedUnit}
        </Typography.Span>
      )}
      {type === "details-page" ? (
        <Typography.H1 weight={700} size="32px" lineHeight={40} color={(theme) => theme.colors.base950}>
          {priceFormatter(
            (productBasicDetails as ProductInvestmentProductBasicDetailsPropsDetailsType).productPrice,
            true
          )}
        </Typography.H1>
      ) : (
        <TextInput
          value={props?.valueText}
          onChange={(evt) => props?.onValueTextChange(evt?.target?.value)}
          icon={<Image src="/icons/usd.svg" alt="USD" width={11} height={22} style={{ marginLeft: "12px" }} />}
          iconPosition="left"
          useButtonIcon={false}
        />
      )}

      {type === "details-page" ? (
        <ProductInvestmentDataProductTags type="details-page" />
      ) : (
        <ProductInvestmentDataProductTags type="asset-wizard" products={props?.products} />
      )}
    </Flex.Column>
  );
};

export default ProductInvestmentProductBasicDetails;
