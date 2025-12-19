"use client";

import type { FC, JSX } from "react";

import { Flex } from "@/components/primitives";
import BaseStyledCartContainer from "./BaseStyledCartContainer";
import CartContentContainer from "./CartContentContainer";
import CartItems from "./cart-items";
import OrderSummary from "./order-summary";
import PageBackButton from "@/components/common/buttons/PageBackButton";

const Cart: FC<object> = (): JSX.Element => {
  return (
    <BaseStyledCartContainer>
      <Flex.Column rowGap="16px">
        <PageBackButton />
        <CartContentContainer>
          <CartItems />
          <OrderSummary />
        </CartContentContainer>
      </Flex.Column>
    </BaseStyledCartContainer>
  );
};

export default Cart;
