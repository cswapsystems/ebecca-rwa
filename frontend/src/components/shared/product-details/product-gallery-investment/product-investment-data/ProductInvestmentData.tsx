import type { FC, JSX } from "react";
import styled from "styled-components";

import { Flex } from "@/components/primitives";
import ProductInvestmentProductBasicDetails from "./ProductInvestmentProductBasicDetails";
import ProductInvestmentDataProductHighlights from "./ProductInvestmentDataProductHighlights";
import { ProductDescription } from "../../common";
import ProductInvestmentDataProductChart from "./ProductInvestmentDataProductChart";
import ProductPurchaseInformationFooter from "../../product-purchase-information/footer";
import { StyledAddCartButtonsMobileWrapper } from "./StyledElements";
import type { ProductTagDTO } from "./useProductInvestmentDataProductTags";

import type { ProductPurchaseInformationProps } from "../../product-purchase-information/ProductPurchaseInformation";

import { breakpoints } from "@/constants";

type ProductInvestmentDataCommonProps = Pick<
  ProductPurchaseInformationProps,
  "productPurchaseInformationPrimaryButtonOnClick" | "productPurchaseInformationSecondaryButtonOnClick"
>;

interface ProductInvestmentDataDetailsPageProps extends ProductInvestmentDataCommonProps {
  type: "details-page";
}

interface ProductInvestmentDataAssetProps extends ProductInvestmentDataCommonProps {
  type: "asset-wizard";
  valueText: string;
  onValueTextChange: (value: string) => void;
  descriptionText: string;
  onDescriptionTextChange: (value: string) => void;
  detailsText: string;
  onDetailsTextChange: (value: string) => void;
  assetName: string;
  products: Array<ProductTagDTO>;
  nameText: string;
  onNameTextChange: (value: string) => void;
}

type Props = ProductInvestmentDataDetailsPageProps | ProductInvestmentDataAssetProps;

const ProductInvestmentDataWrapper = styled(Flex.Column)`
  flex: 1;
  width: 100% !important;
  @media only screen and (max-width: ${breakpoints.l}px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

const ProductInvestmentData: FC<Props> = (props): JSX.Element => {
  const {
    type = "details-page",
    productPurchaseInformationPrimaryButtonOnClick,
    productPurchaseInformationSecondaryButtonOnClick,
  } = props;

  return (
    <ProductInvestmentDataWrapper width="100%" rowGap="32px">
      {type === "details-page" ? (
        <ProductInvestmentProductBasicDetails
          productAddress="1234 Palm Grove Drive, Los Angeles, CA"
          productPrice={250}
          type={type}
          productFractionalizedUnit="1 Fractionalized Unit (0.00001%)"
        />
      ) : (
        <ProductInvestmentProductBasicDetails
          productAddress={(props as ProductInvestmentDataAssetProps)?.assetName}
          type={type}
          products={(props as ProductInvestmentDataAssetProps)?.products}
          valueText={(props as ProductInvestmentDataAssetProps).valueText}
          productFractionalizedUnit="1 Fractionalized Unit (0.00001%)"
          onValueTextChange={(props as ProductInvestmentDataAssetProps).onValueTextChange}
          nameText={(props as ProductInvestmentDataAssetProps)?.nameText}
          onNameTextChange={(props as ProductInvestmentDataAssetProps)?.onNameTextChange}
        />
      )}

      <StyledAddCartButtonsMobileWrapper>
        <ProductPurchaseInformationFooter
          type={type}
          productPurchaseInformationPrimaryButtonOnClick={productPurchaseInformationPrimaryButtonOnClick}
          productPurchaseInformationSecondaryButtonOnClick={productPurchaseInformationSecondaryButtonOnClick}
        />
      </StyledAddCartButtonsMobileWrapper>

      <ProductInvestmentDataProductChart />
      {type === "details-page" ? (
        <ProductDescription type="details-page" />
      ) : (
        <ProductDescription
          type="asset-wizard"
          isEditor
          productDescriptionValue={(props as ProductInvestmentDataAssetProps)?.descriptionText}
          onProductDescriptionChange={(props as ProductInvestmentDataAssetProps)?.onDescriptionTextChange}
        />
      )}
      {type === "details-page" ? (
        <ProductInvestmentDataProductHighlights type={type} />
      ) : (
        <ProductInvestmentDataProductHighlights
          type={type}
          productDetailsValue={(props as ProductInvestmentDataAssetProps)?.detailsText}
          onProductDetailsValueChange={(props as ProductInvestmentDataAssetProps)?.onDetailsTextChange}
        />
      )}
    </ProductInvestmentDataWrapper>
  );
};

export default ProductInvestmentData;
