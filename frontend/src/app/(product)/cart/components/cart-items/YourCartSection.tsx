import type { FC, JSX } from 'react';
import Image from 'next/image';

import { Flex } from '@/components/primitives';
import { Typography } from '@/components/common';
import { StyledYourCartSectionImageWrapper } from './StyledElements';

const YourCartSection: FC<object> = (): JSX.Element => {
  return (
    <Flex.Row columnGap="10px" alignItems="center">
      <StyledYourCartSectionImageWrapper>
        <Image src="/icons/cart.svg" alt="Cart" fill objectFit="cover" />
      </StyledYourCartSectionImageWrapper>
      <Typography.H3 size="24px" lineHeight={30} weight={700} color="#2D3648" texttransform="capitalize">
        Your cart
      </Typography.H3>
    </Flex.Row>
  );
};

export default YourCartSection;
