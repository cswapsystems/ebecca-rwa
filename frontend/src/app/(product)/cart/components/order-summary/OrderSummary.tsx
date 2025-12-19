import type { FC, JSX } from 'react';

import { ProductCartCard } from '../common';

import { Typography } from '@/components/common';
import { Flex } from '@/components/primitives';

import OrderSummaryItems from './OrderSummaryItems';
import OrderSummaryTotal from './OrderSummaryTotal';

const OrderSummary: FC<object> = (): JSX.Element => {
  return (
    <ProductCartCard width="50%" minHeight="700px" isMobileHidden>
      <Flex.Column rowGap="32px" alignItems="flex-start" justifyContent="space-between">
        <Flex.Column rowGap="32px">
          <Typography.H3
            size="24px"
            lineHeight={30}
            weight={700}
            color={(theme) => theme.colors.base950}
            texttransform="capitalize"
          >
            Order summary
          </Typography.H3>
          <OrderSummaryItems />
        </Flex.Column>
        <OrderSummaryTotal totalAmount={3250} />
      </Flex.Column>
    </ProductCartCard>
  );
};

export default OrderSummary;
