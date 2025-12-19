'use client';

import { useMemo } from 'react';

import type { CartItemDTO } from '../types';

const usedCartProductIds = new Set<number>();

function generateUniqueCartProductId(): string {
  try {
    let id: number;

    do {
      id = Math.floor(Math.random() * 1000) + 1;
    } while (usedCartProductIds.has(id));

    usedCartProductIds.add(id);

    return id.toString();
  } catch (error) {
    console.warn('Error generating unique cart product ID:', error);
    return '0';
  }
}

type UseGetCartItems = () => Array<CartItemDTO>;

const useGetCartItems: UseGetCartItems = () => {
  const mockCartItems = useMemo<CartItemDTO[]>(() => {
    return [
      {
        cart_product_id: `product-${generateUniqueCartProductId()}`,
        cart_product_name: '1234 Palm Grove Drive, Los Angeles, CA',
        cart_product_tags: [
          {
            tag: 'Real Estate',
            icon: '/icons/real-estate.svg',
          },
          {
            tag: 'KYC',
            icon: '/icons/kyc.svg',
          },
          {
            tag: 'Fractionalized',
            icon: '/icons/fractionalized.svg',
          },
          {
            tag: 'Brinks',
            icon: '/icons/brinks.svg',
          },
        ],
        cart_product_summary: '1 Fractionalized Unit (0.00001%)',
        cart_product_item_price: 2000,
        cart_product_price_per_item: 2000,
        cart_product_quantity: 1,
        cart_product_description:
          'Located in the heart of Los Angeles, this modern residential property offers both long-term value and stable rental potential. With its prime location, contemporary design, and proximity to key business districts, it represents a strong real estate asset for investors seeking reliable returns.',
        cart_product_image: '/images/image_placeholder1.png',
      },
      {
        cart_product_id: `product-${generateUniqueCartProductId()}`,
        cart_product_name: 'Commodity: Gold Bullion – 100g',
        cart_product_tags: [
          {
            tag: 'KYC',
            icon: '/icons/kyc.svg',
          },
          {
            tag: 'Fractionalized',
            icon: '/icons/fractionalized.svg',
          },
          {
            tag: 'Brinks',
            icon: '/icons/brinks.svg',
          },
        ],
        cart_product_summary: '2 Gold Bullions',
        cart_product_item_price: 1000,
        cart_product_price_per_item: 1000,
        cart_product_quantity: 1,
        cart_product_description:
          'A solid physical investment asset representing high-purity gold bars. Ideal for preserving wealth, offering long-term stability and protection against inflation with consistent market demand.',
        cart_product_image: '/images/image_placeholder2.png',
      },
      {
        cart_product_id: `product-${generateUniqueCartProductId()}`,
        cart_product_name: '2018 Ferrari 488 GTB – Rosso Corsa',
        cart_product_tags: [
          {
            tag: 'KYC',
            icon: '/icons/kyc.svg',
          },
          {
            tag: 'Fractionalized',
            icon: '/icons/fractionalized.svg',
          },
          {
            tag: 'Brinks',
            icon: '/icons/brinks.svg',
          },
        ],
        cart_product_summary: '1 Fractionalized Unit (0.00001%)',
        cart_product_item_price: 2000,
        cart_product_price_per_item: 2000,
        cart_product_quantity: 1,
        cart_product_description:
          'A high-performance luxury sports car featuring Ferrari’s signature Rosso Corsa finish. Combines exceptional speed, design, and collector value — making it both a passion asset and an appreciating investment.',
        cart_product_image: '/images/image_placeholder3.png',
      },
    ];
  }, []);

  return mockCartItems;
};

export default useGetCartItems;
