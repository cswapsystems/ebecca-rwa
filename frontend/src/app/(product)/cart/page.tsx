import type { JSX } from 'react';

import Cart from './components/Cart';

export default async function CartPage(): Promise<JSX.Element> {
  try {
    return <Cart />;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load cart page');
  }
}
