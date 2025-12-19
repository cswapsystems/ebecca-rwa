import type { JSX } from 'react';

import ProductInfo from './components/ProductInfo';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  try {
    const { id } = await params;

    return <ProductInfo productId={id ?? ''} />;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load product details page');
  }
}
