import type { FC, JSX } from "react";

import { ProductDetailsCard, ProductDescription } from "../common";
import { Typography } from "@/components/common";
import ProductPurchaseInformationProductAddress from "./ProductPurchaseInformationProductAddress";
import ProductPurchaseInformationFooter from "./footer";
import { ProductDetailsComponentType } from "../ProductDetails";

interface ProductPurchaseInformationDetailsCommonProps {
  productPurchaseInformationSecondaryButtonOnClick?: () => void;
  productPurchaseInformationPrimaryButtonOnClick?: () => void;
  productTotalPrice?: number;
  productAddress?: string;
  productFractionalizedUnit?: string;
  isPrimaryButtonDisabled?: boolean;
}

interface ProductPurchaseInformationDetailsPageProps extends ProductPurchaseInformationDetailsCommonProps {
  type: "details-page";
}

interface ProductPurchaseInformationAssetWizardProps extends ProductPurchaseInformationDetailsCommonProps {
  type: "asset-wizard";
  productDescriptionValue: string;
}

export type ProductPurchaseInformationProps =
  | ProductPurchaseInformationDetailsPageProps
  | ProductPurchaseInformationAssetWizardProps;

const ProductPurchaseInformation: FC<ProductPurchaseInformationProps> = ({
  type,
  productTotalPrice,
  productAddress,
  productFractionalizedUnit,
  isPrimaryButtonDisabled = false,
  productPurchaseInformationPrimaryButtonOnClick,
  productPurchaseInformationSecondaryButtonOnClick,
  ...rest
}): JSX.Element => {
  return (
    <ProductDetailsCard width="40%" minHeight="700px" gap="32px" isMobileHidden>
      <Typography.H2 texttransform="capitalize" weight={700} size="24px" color={(theme) => theme.colors.base950}>
        Purchase information
      </Typography.H2>
      <ProductPurchaseInformationProductAddress
        productAddress={productAddress ?? ""}
        productTotalPrice={productTotalPrice ?? 0}
        productFractionalizedUnit={productFractionalizedUnit}
      />
      {type === "details-page" ? (
        <ProductDescription type={type} />
      ) : (
        <ProductDescription
          type={type}
          productDescriptionValue={(rest as ProductPurchaseInformationAssetWizardProps)?.productDescriptionValue}
          onProductDescriptionChange={() => {}}
          isEditor={false}
        />
      )}
      <ProductPurchaseInformationFooter
        type={type}
        isPrimaryButtonDisabled={isPrimaryButtonDisabled}
        productPurchaseInformationPrimaryButtonOnClick={productPurchaseInformationPrimaryButtonOnClick}
        productPurchaseInformationSecondaryButtonOnClick={productPurchaseInformationSecondaryButtonOnClick}
      />
    </ProductDetailsCard>
  );
};

export default ProductPurchaseInformation;
