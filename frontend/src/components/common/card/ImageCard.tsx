'use client';

import type { FC, JSX, ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import BaseCard from './BaseCard';

interface ImageCardProps {
  imgSrc: string;
  footer: ReactElement;
  $imgHeight?: number;
}

const ImageContainer = styled.div<Pick<ImageCardProps, '$imgHeight'>>`
  position: relative;
  width: 100%;
  height: ${({ $imgHeight }) => $imgHeight ?? 220};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const FooterContainer = styled.div`
  padding: 2.813rem 2.188rem;
`;

const ImageCard: FC<ImageCardProps> = ({ imgSrc, footer, $imgHeight }): JSX.Element => {
  return (
    <BaseCard display="flex" flexDirection="column">
      <ImageContainer $imgHeight={$imgHeight}>
        <StyledImage src={imgSrc} alt="Image Card" fill unoptimized />
      </ImageContainer>
      <FooterContainer>{footer}</FooterContainer>
    </BaseCard>
  );
};

export default ImageCard;
