import type { FC, JSX, MouseEventHandler } from 'react';
import { type ImageProps } from 'next/image';

import type { ProductGalleryImageSizeType } from './types';
import { StyledProductGalleryImageContainer, StyledProductGalleryImage } from './StyledElements';

export interface ProductGalleryImageProps extends Pick<ImageProps, 'src'> {
  size: ProductGalleryImageSizeType;
  isActive?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
}

const ProductGalleryImage: FC<ProductGalleryImageProps> = ({ size, src, isActive, onMouseEnter }): JSX.Element => {
  return (
    <StyledProductGalleryImageContainer $size={size} onMouseEnter={onMouseEnter}>
      <StyledProductGalleryImage
        src={src}
        $size={size}
        // TODO: Replace with actual alt text
        alt="Product Image"
        $isActive={isActive}
        fill
        priority
      />
    </StyledProductGalleryImageContainer>
  );
};

export default ProductGalleryImage;
