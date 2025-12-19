'use client';

import type { FC, JSX } from 'react';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { StyledCounterButtonWrapper, CartQuantityCounterButtonWrapper } from './StyledElements';
import { Typography } from '@/components/common';

interface CartQuantityCounterButtonProps {
  quantity?: number;
  onIncrementClickCallback: () => void;
  onDecrementClickCallback: () => void;
}

const StyledButtonDefault = styled.button`
  background: none;
  border: 0px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  position: relative;
`;

const CartQuantityCounterButton: FC<CartQuantityCounterButtonProps> = ({
  quantity,
  onIncrementClickCallback,
  onDecrementClickCallback,
}): JSX.Element => {
  const [quantityCounter, setQuantityCounter] = useState(quantity || 1);

  const handleIncrementClick = (): void => {
    setQuantityCounter((prev) => prev + 1);
    onIncrementClickCallback();
  };

  const handleDecrementClick = useCallback((): void => {
    if (quantityCounter > 1) {
      setQuantityCounter((prev) => prev - 1);
    }
    onDecrementClickCallback();
  }, [quantityCounter, onDecrementClickCallback]);

  return (
    <StyledCounterButtonWrapper>
      <CartQuantityCounterButtonWrapper alignItems="center">
        <StyledButtonDefault type="button" onClick={handleDecrementClick}>
          <Image src="/icons/subtract.svg" alt="Decrement" fill style={{ objectFit: 'contain' }} />
        </StyledButtonDefault>
        <Typography.Span size="16px" lineHeight={22} weight={600} color={(theme) => theme.colors.base950}>
          {quantityCounter}
        </Typography.Span>
        <StyledButtonDefault type="button" onClick={handleIncrementClick}>
          <Image src="/icons/plus.svg" alt="Increment" fill style={{ objectFit: 'contain' }} />
        </StyledButtonDefault>
      </CartQuantityCounterButtonWrapper>
    </StyledCounterButtonWrapper>
  );
};

export default CartQuantityCounterButton;
