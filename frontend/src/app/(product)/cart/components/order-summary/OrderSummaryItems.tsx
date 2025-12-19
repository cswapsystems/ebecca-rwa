"use client";

import type { FC, JSX } from "react";

import { useGetCartItems } from "../../hooks";

import { Typography } from "@/components/common";
import { Flex } from "@/components/primitives";
import { StyledOrderSummaryTitle } from "./StyledElements";

import { priceFormatter } from "@/utils";

const OrderSummaryItems: FC<object> = (): JSX.Element => {
  const cartItems = useGetCartItems();

  return (
    <Flex.Column rowGap="32px" width="100%">
      {cartItems?.map((cart) => (
        <Flex.Row key={cart?.cart_product_id} width="100%" alignItems="flex-start" justifyContent="space-between">
          <Flex.Column rowGap="16px">
            <StyledOrderSummaryTitle weight={700} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
              {cart?.cart_product_name ?? "N/A"}
            </StyledOrderSummaryTitle>
            <Typography.Span weight={500} size="16px" lineHeight={22} color={(theme) => theme.colors.base950}>
              {cart?.cart_product_summary ?? "No summary available."}
            </Typography.Span>
          </Flex.Column>
          <Typography.Span size="16px" lineHeight={22} weight={700} color={(theme) => theme.colors.base950}>
            {priceFormatter(Number(cart?.cart_product_price_per_item * (cart?.cart_product_quantity ?? 1)), true)}
          </Typography.Span>
        </Flex.Row>
      ))}
    </Flex.Column>
  );
};

export default OrderSummaryItems;
