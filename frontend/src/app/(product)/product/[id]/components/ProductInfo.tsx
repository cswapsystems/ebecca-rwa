'use client';

import type { FC, JSX } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import ProductDetails from '@/components/shared/product-details/ProductDetails';

interface Props {
  productId: string;
}

const ProductInfo: FC<Props> = ({ productId }): JSX.Element => {
  const router = useRouter();

  const onButtonPrimaryClick = useCallback((): void => {
    router.push('/cart');
  }, [router]);

  return (
    <ProductDetails
      productId={productId}
      type="details-page"
      productPurchaseInformationPrimaryButtonOnClick={onButtonPrimaryClick}
    />
  );
};

export default ProductInfo;
