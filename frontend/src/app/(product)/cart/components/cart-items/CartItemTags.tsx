'use client';

import type { FC, JSX } from 'react';

import { StyledCartItemTagsWrapper } from './StyledElements';

import { CategoryTag } from '@/components/common';

interface ProductTagDTO {
  tag: string;
  icon: string;
}

interface CartItemTagsProps {
  data: Array<ProductTagDTO>;
}

const CartItemTags: FC<CartItemTagsProps> = ({ data }): JSX.Element => {
  return (
    <StyledCartItemTagsWrapper columnGap="8px" rowGap="8px">
      {data?.map(
        (tag, idx): JSX.Element => (
          <CategoryTag key={String(`${tag?.tag}-${idx}`)} icon={tag?.icon} tag={tag?.tag} />
        )
      )}
    </StyledCartItemTagsWrapper>
  );
};

export default CartItemTags;
