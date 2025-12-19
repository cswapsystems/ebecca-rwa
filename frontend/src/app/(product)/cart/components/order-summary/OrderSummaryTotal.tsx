'use client';

import type { FC, JSX } from 'react';

import { Flex } from '@/components/primitives';
import { Typography, Button } from '@/components/common';
import { OrderSummaryTotalContainer, OrderSummaryTextMobile } from './StyledElements';

import { priceFormatter } from '@/utils';

interface Props {
  totalAmount: number;
}

const OrderSummaryTotal: FC<Props> = ({ totalAmount }): JSX.Element => {
  return (
    <OrderSummaryTotalContainer rowGap="20px">
      <OrderSummaryTextMobile
        size="24px"
        weight={700}
        color={(theme) => theme.colors.base950}
        texttransform="capitalize"
      >
        Order summary
      </OrderSummaryTextMobile>
      <Flex.Row width="100%" alignItems="center" justifyContent="space-between">
        <Typography.P weight={500} size="20px" color="#2D3648">
          Cart total:
        </Typography.P>
        <Typography.Span weight={500} size="20px" color={(theme) => theme.colors.base950}>
          {priceFormatter(totalAmount, true)}
        </Typography.Span>
      </Flex.Row>
      <Button lineHeight={24} variant="primary" onClick={() => {}}>
        Proceed to Checkout
      </Button>
    </OrderSummaryTotalContainer>
  );
};

export default OrderSummaryTotal;
