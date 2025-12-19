import type { FC, JSX } from "react";

import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";

import { priceFormatter } from "@/utils";

interface ProductPurchaseInformationProductAddressProps {
  productAddress: string;
  productTotalPrice: number;
  productFractionalizedUnit?: string;
}

const ProductPurchaseInformationProductAddress: FC<ProductPurchaseInformationProductAddressProps> = ({
  productAddress,
  productTotalPrice,
  productFractionalizedUnit,
}): JSX.Element => {
  return (
    <Flex.Column rowGap="12px" alignItems="flex-start">
      <Flex.Row alignItems="flex-start" justifyContent="space-between" width="100%">
        <Typography.H4 weight={700} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
          {productAddress}
        </Typography.H4>
        <Typography.H4 weight={700} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
          {priceFormatter(productTotalPrice, true)}
        </Typography.H4>
      </Flex.Row>
      {productFractionalizedUnit && (
        <Typography.Span weight={500} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
          {productFractionalizedUnit}
        </Typography.Span>
      )}
    </Flex.Column>
  );
};

export default ProductPurchaseInformationProductAddress;
