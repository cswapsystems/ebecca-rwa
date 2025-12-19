'use client';

import type { FC, JSX } from 'react';
import { useState } from 'react';
import { Flex } from '@/components/primitives';
import { Typography, TextInput } from '@/components/common';
import { StyledQuantityMaxButton } from './StyledElements';

import { priceFormatter } from '@/utils';

interface Props {
  quantity: number;
}

const ProductPurchaseInformationQuantity: FC<Props> = ({ quantity }): JSX.Element => {
  const [quantityValue, setQuantityValue] = useState('');

  return (
    <Flex.Column alignItems="flex-start" rowGap="20px" width="100%">
      <Typography.Span weight={500} size="20px" color="#2D3648" texttransform="capitalize">
        quantity
      </Typography.Span>
      <Flex.Row width="100%" columnGap="16px">
        <TextInput
          value={quantityValue}
          onChange={(e) => setQuantityValue(e?.target?.value)}
          placeholder="100"
          width="100%"
          type="tel"
        />
        <StyledQuantityMaxButton variant="secondary" onClick={() => {}} fontSize="16px" padding="12px">
          Max
        </StyledQuantityMaxButton>
      </Flex.Row>
      <Typography.Span size="16px" lineHeight="22px" color={(theme) => theme.colors.base500}>
        Estimated total: {priceFormatter(200000)}
      </Typography.Span>
    </Flex.Column>
  );
};

export default ProductPurchaseInformationQuantity;
