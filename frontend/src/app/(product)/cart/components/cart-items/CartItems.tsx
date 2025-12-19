'use client';

import type { FC, JSX } from 'react';

import YourCartSection from './YourCartSection';

import { ProductCartCard } from '../common';
import { useGetCartItems } from '../../hooks';
import CartItemLayout from './CartItemLayout';
import OrderSummaryTotal from '../order-summary/OrderSummaryTotal';
import { CartItemLayoutCartTotalWrapper } from './StyledElements';

const CartItems: FC<object> = (): JSX.Element => {
  const cartItems = useGetCartItems();
  return (
    <ProductCartCard>
      <YourCartSection />
      {cartItems?.map((cartItem) => (
        <CartItemLayout key={cartItem?.cart_product_id} data={cartItem} />
      ))}
      <CartItemLayoutCartTotalWrapper>
        <OrderSummaryTotal totalAmount={3250} />
      </CartItemLayoutCartTotalWrapper>
    </ProductCartCard>
  );
};

export default CartItems;
