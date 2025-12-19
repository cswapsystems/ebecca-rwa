import type { FC, JSX } from 'react';
import Image from 'next/image';

import { Flex } from '@/components/primitives';
import {
  StyledCartItemImageWrapper,
  StyledCartItemRemoveButton,
  StyledCartItemLayoutImage,
  StyledCartItemLayoutProductDataWrapper,
  StyledCartItemLayoutCartContentWrapper,
  CartItemLayoutPriceDesktop,
  CartItemLayoutPriceMobile,
  CartItemLayoutDescription,
  ToggleContentButtonWrapper,
  CartItemLayoutDescriptionMobile,
  CartItemLayoutProductNameTextDesktop,
  CartItemLayoutProductNameTextMobile,
  CartItemLayoutProductSummaryText,
  CartItemLayoutBottomFlexRow,
  CartItemLayoutRemoveButtonText,
  CartItemLayoutRemoveButtonIconWrapper,
} from './StyledElements';

import type { CartItemDTO } from '../../types';

import { ToggleContent } from '@/components/common';
import { priceFormatter } from '@/utils';
import CartQuantityCounterButton from './CartQuantityCounterButton';
import CartItemTags from './CartItemTags';

interface CartItemLayoutProps {
  data: CartItemDTO;
}

const CartItemLayout: FC<CartItemLayoutProps> = ({ data }): JSX.Element => {
  return (
    <Flex.Row width="100%" alignItems="flex-start" justifyContent="space-between" directionMobile="column">
      <StyledCartItemLayoutCartContentWrapper columnGap="20px" alignItems="flex-start">
        <StyledCartItemImageWrapper>
          <StyledCartItemLayoutImage
            src={data?.cart_product_image ?? '-'}
            alt={data?.cart_product_name ?? 'Product Image'}
            fill
            objectFit="cover"
            priority
          />
        </StyledCartItemImageWrapper>
        <StyledCartItemLayoutProductDataWrapper width="calc(100% - 100px)">
          <CartItemTags data={data?.cart_product_tags ?? []} />
          <CartItemLayoutProductNameTextDesktop
            weight={700}
            size="20px"
            lineHeight={26}
            color={(theme) => theme.colors.base950}
          >
            {data?.cart_product_name ?? 'N/A'}
          </CartItemLayoutProductNameTextDesktop>
          <CartItemLayoutProductNameTextMobile
            weight={700}
            size="18px"
            lineHeight={24}
            color={(theme) => theme.colors.base950}
          >
            {data?.cart_product_name ?? 'N/A'}
          </CartItemLayoutProductNameTextMobile>
          <CartItemLayoutProductSummaryText weight={500} color={(theme) => theme.colors.base950}>
            {data?.cart_product_summary}
          </CartItemLayoutProductSummaryText>
          <CartItemLayoutDescription weight={400} size="16px" lineHeight={22} color={(theme) => theme.colors.base500}>
            {data?.cart_product_description ?? 'No description available.'}
          </CartItemLayoutDescription>

          <CartItemLayoutPriceMobile weight={700} size="16px" lineHeight={22}>
            {priceFormatter(Number(data?.cart_product_price_per_item * data?.cart_product_quantity))}
          </CartItemLayoutPriceMobile>

          <ToggleContentButtonWrapper>
            <ToggleContent
              content={
                <CartItemLayoutDescriptionMobile
                  weight={400}
                  style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}
                  size="16px"
                  lineHeight={22}
                  color={(theme) => theme.colors.base500}
                >
                  {data?.cart_product_description ?? 'No description available.'}
                </CartItemLayoutDescriptionMobile>
              }
              hasCollapseFn={false}
            />
          </ToggleContentButtonWrapper>

          <CartItemLayoutBottomFlexRow alignItems="center" columnGap="30px">
            <StyledCartItemRemoveButton>
              <Flex.Row alignItems="center" columnGap="10px">
                <CartItemLayoutRemoveButtonIconWrapper>
                  <Image src="/icons/trash.svg" alt="Remove Item" fill unoptimized />
                </CartItemLayoutRemoveButtonIconWrapper>

                <CartItemLayoutRemoveButtonText
                  weight={500}
                  color={(theme) => theme.colors.base950}
                  texttransform="capitalize"
                >
                  remove
                </CartItemLayoutRemoveButtonText>
              </Flex.Row>
            </StyledCartItemRemoveButton>
            <CartQuantityCounterButton
              quantity={1}
              onDecrementClickCallback={() => {}}
              onIncrementClickCallback={() => {}}
            />
          </CartItemLayoutBottomFlexRow>
        </StyledCartItemLayoutProductDataWrapper>
      </StyledCartItemLayoutCartContentWrapper>
      <CartItemLayoutPriceDesktop weight={700} size="20px" lineHeight={26}>
        {priceFormatter(Number(data?.cart_product_price_per_item * data?.cart_product_quantity))}
      </CartItemLayoutPriceDesktop>
    </Flex.Row>
  );
};

export default CartItemLayout;
