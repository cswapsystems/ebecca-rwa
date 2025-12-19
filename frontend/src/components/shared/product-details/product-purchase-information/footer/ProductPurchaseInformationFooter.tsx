"use client";

import type { FC } from "react";
import { Button } from "@/components/common";
import { StyledProductInformationFooterContainer, ProductQuantityButtonsWrapper } from "./StyledElements";
import ProductPurchaseInformationQuantity from "./ProductPurchaseInformationQuantity";
import ProductPurchaseInformationAddCart from "./ProductPurchaseInformationAddCart";
import type { ProductDetailsProps } from "../../ProductDetails";
import type { ProductPurchaseInformationProps } from "../ProductPurchaseInformation";

type Props = Pick<ProductDetailsProps, "type"> &
  Pick<
    ProductPurchaseInformationProps,
    | "isPrimaryButtonDisabled"
    | "productPurchaseInformationPrimaryButtonOnClick"
    | "productPurchaseInformationSecondaryButtonOnClick"
  >;

const ProductPurchaseInformationFooter: FC<Props> = ({
  type,
  isPrimaryButtonDisabled,
  productPurchaseInformationPrimaryButtonOnClick,
  productPurchaseInformationSecondaryButtonOnClick,
}) => {
  if (type === "asset-wizard") {
    return (
      <StyledProductInformationFooterContainer rowGap="20px">
        <Button
          variant="primary"
          disabled={isPrimaryButtonDisabled}
          onClick={() => productPurchaseInformationPrimaryButtonOnClick?.()}
        >
          Verify Asset
        </Button>
      </StyledProductInformationFooterContainer>
    );
  }

  return (
    <StyledProductInformationFooterContainer rowGap="20px">
      <ProductPurchaseInformationQuantity quantity={1} />
      <ProductQuantityButtonsWrapper>
        <ProductPurchaseInformationAddCart />
        <Button
          variant="primary"
          width="100%"
          disabled={isPrimaryButtonDisabled}
          onClick={() => productPurchaseInformationPrimaryButtonOnClick?.()}
        >
          Buy Now
        </Button>
      </ProductQuantityButtonsWrapper>
    </StyledProductInformationFooterContainer>
  );
};

export default ProductPurchaseInformationFooter;
