'use client';

import type { ButtonHTMLAttributes, FC, JSX } from 'react';
import Image from 'next/image';

import {
  StyledKeywordButtonSelected,
  StyledKeywordButtonUnselected,
  StyledCheckmarkIconContainer,
} from './KeywordSelectStyledElements';

import type { KeywordItemDTO } from './types';

import { Flex } from '@/components/primitives';
import { Typography } from '@/components/common';

interface KeywordButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  isSelected: boolean;
  data: KeywordItemDTO;
}

const KeywordButton: FC<KeywordButtonProps> = ({ data, isSelected, onClick }): JSX.Element => {
  if (!isSelected) {
    return (
      <StyledKeywordButtonUnselected name="keyword" type="button" onClick={onClick}>
        <Typography.Span size="16px" lineHeight="22px" color={(theme) => theme.colors.base700}>
          {data?.keyword ?? ''}
        </Typography.Span>
      </StyledKeywordButtonUnselected>
    );
  }

  return (
    <Flex.Row as={StyledKeywordButtonSelected} alignItems="center" columnGap="14px" type="button" onClick={onClick}>
      <StyledCheckmarkIconContainer>
        <Image src="/icons/checkmark.svg" alt="Checkmark" fill />
      </StyledCheckmarkIconContainer>

      <Typography.Span size="16px" lineHeight="22px" color={(theme) => theme.colors.white}>
        {data?.keyword ?? ''}
      </Typography.Span>
    </Flex.Row>
  );
};

export default KeywordButton;
