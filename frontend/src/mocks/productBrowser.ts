import type { AssetItem } from '@/app/(secondary)/product-browser/productBrowserTypes';

export const productFilterLabels = {
  category: 'Category',
  subcategories: 'Subcategories',
  kycRequirement: 'KYC Requirement',
  price: 'Price',
} as const;

export const productCategoryOptions = ['real-estate', 'commodities', 'tradfi', 'collectibles'] as const;

export const productCategoryDisplayMap: Record<string, string> = {
  'real-estate': 'Real Estate',
  'commodities': 'Commodities',
  'tradfi': 'TradFi',
  'collectibles': 'Collectibles',
} as const;

export const productSubcategoryOptions = ['Vintage', 'Modern', 'Contemporary'] as const;

export const productKycOptions = ['Required', 'Not Required'] as const;

// Backend-like JSON-style filters config
export const productFilterSectionsData = [
  {
    key: 'category',
    label: productFilterLabels.category,
    options: productCategoryOptions.map((cat) => productCategoryDisplayMap[cat] || cat),
  },
  {
    key: 'subcategory',
    label: productFilterLabels.subcategories,
    options: [...(productSubcategoryOptions as unknown as string[])],
  },
  {
    key: 'kyc',
    label: productFilterLabels.kycRequirement,
    options: [...(productKycOptions as unknown as string[])],
  },
] as const;

export const productBrowserAssetsData: AssetItem[] = [
  {
    id: '1',
    imageSrc: '/images/product-browser-placeholder.png',
    title: 'American Eagle Silver Coin',
    quantityLabel: '1 sg | NAI Estates',
    description: 'a highly recognized bullion coin, prized for its timeless design and pure silver ...',
    price: 546,
    category: 'commodities',
    subcategory: 'Vintage',
    kyc: 'Required',
    tags: ['personal-collection', 'home', 'table', 'green-house'],
  },
  {
    id: '2',
    imageSrc: '/images/product-browser-placeholder.png',
    title: 'Pokemon Earthen Legend.',
    quantityLabel: '1 Sealed Pack',
    description: 'a collectible item that celebrates the rich lore of the Pokemon universe ...',
    price: 546,
    category: 'collectibles',
    subcategory: 'Modern',
    kyc: 'Not Required',
    tags: ['personal-collection', 'home', 'table', 'green-house'],
  },
  {
    id: '3',
    imageSrc: '/images/product-browser-placeholder.png',
    title: '17 Fifth Avenue Towers',
    quantityLabel: '1% Residential Property',
    description: '17 5th Ave. is a desirable property situated in a prime location ...',
    price: 546,
    category: 'real-estate',
    subcategory: 'Contemporary',
    kyc: 'Required',
    tags: ['personal-collection', 'home', 'table', 'green-house'],
  },
  {
    id: '4',
    imageSrc: '/images/product-browser-placeholder.png',
    title: '1234 Palm Grove Drive, Los Angeles, CA',
    quantityLabel: '1 Fractionalized Unit (0.00...)',
    description: 'Located in the heart of Los Angeles, this modern residential property offer...',
    price: 546,
    category: 'real-estate',
    subcategory: 'Modern',
    kyc: 'Required',
    tags: ['personal-collection', 'home', 'table', 'green-house'],
  },
  {
    id: '5',
    imageSrc: '/images/product-browser-placeholder.png',
    title: 'American Eagle Silver Coin',
    quantityLabel: '1 Silver Coin',
    description: 'a highly recognized bullion coin, prized for its timeless design and pure silver ...',
    price: 546,
    category: 'commodities',
    subcategory: 'Vintage',
    kyc: 'Not Required',
    tags: ['personal-collection', 'home', 'table', 'green-house'],
  },
  {
    id: '6',
    imageSrc: '/images/product-browser-placeholder.png',
    title: 'Corporate Bond Series 2024',
    quantityLabel: '1 Tokenized Bond',
    description: 'A high-yield corporate bond tokenized on-chain for enhanced liquidity and transparency ...',
    price: 1200,
    category: 'tradfi',
    subcategory: 'Modern',
    kyc: 'Required',
    tags: ['personal-collection', 'home', 'table'],
  },
];

export const productBrowserCarouselData = [
  {
    text: {
      title: 'Reimagine Ownership in the Digital Age',
      body: 'Discover a new standard of investing — where real-world assets meet the power of blockchain.',
      button: 'View Real Estate Deals',
    },
    image: {
      src: '/images/image_placeholder3.png',
      alt: 'Real-world assets meet blockchain',
      width: 1200,
      height: 400,
      overlay: '#1C278C',
    },
  },
  {
    text: {
      title: 'Invest in Tokenized Commodities',
      body: 'Access commodities on-chain with instant settlement and transparent ownership.',
      button: 'Explore Commodities',
    },
    image: {
      src: '/images/image_placeholder3.png',
      alt: 'Tokenized commodities',
      width: 1200,
      height: 400,
      overlay: '#1C278C',
    },
  },
  {
    text: {
      title: 'Build Your Digital Collection',
      body: 'Collect scarce on-chain assets from art to memorabilia, backed by real provenance.',
      button: 'Browse Collectibles',
    },
    image: {
      src: '/images/image_placeholder3.png',
      alt: 'Digital collectibles',
      width: 1200,
      height: 400,
      overlay: '#1C278C',
    },
  },
] as const;
