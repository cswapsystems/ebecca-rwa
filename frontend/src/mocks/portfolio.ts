'use client';

import { DropdownOption } from '@/types';

export type PortfolioAllocation = {
  label: string;
  code: string;
  total: number;
  percentage: number;
};

export type PortfolioAsset = {
  id: string;
  icon: string;
  title: string;
  badge?: 'G' | 'F';
  purchase: number;
  current: number;
  gainPct: number;
  monthlyYield?: number;
  totalYield?: number;
  earning?: 'start' | 'active';
};

export const portfolioAllocations: PortfolioAllocation[] = [
  { label: 'Liquidity Pool', code: 'LP', total: 60, percentage: 60 },
  { label: 'Farming', code: 'FR', total: 25, percentage: 25 },
  { label: 'Staking', code: 'ST', total: 15, percentage: 15 },
];

export const portfolioAssets: PortfolioAsset[] = [
  {
    id: '1',
    icon: '/images/image_placeholder1.png',
    title: 'Silver Coin #001',
    badge: 'G',
    purchase: 1000,
    current: 1300,
    gainPct: 30,
    earning: 'start',
  },
  {
    id: '2',
    icon: '/images/image_placeholder2.png',
    title: 'Commodity: Coal #001',
    purchase: 1000,
    current: 1300,
    gainPct: 30,
    monthlyYield: 2400,
    totalYield: 16000,
    earning: 'active',
  },
  {
    id: '3',
    icon: '/images/image_placeholder3.png',
    title: '0923 Palm Grove Drive Los Angeles, CA 90210',
    badge: 'F',
    purchase: 1000,
    current: 1300,
    gainPct: 30,
    monthlyYield: 2400,
    totalYield: 16000,
    earning: 'active',
  },
  {
    id: '4',
    icon: '/images/image_placeholder1.png',
    title: 'Bronze Coin #021',
    badge: 'G',
    purchase: 1000,
    current: 1300,
    gainPct: 30,
    earning: 'start',
  },
  {
    id: '5',
    icon: '/images/image_placeholder2.png',
    title: '789 Ocean View Avenue, San Francisco, CA 94112',
    purchase: 1000,
    current: 1300,
    gainPct: 30,
    monthlyYield: 2400,
    totalYield: 16000,
    earning: 'active',
  },
];

export const portfolioSummary = {
  totalValue: 243532,
  allAssetsVal: 56892,
  purchaseCost: 56892,
  gainPct: 468.92,
};

// Dropdown options for Portfolio page
export const portfolioSortOptions: DropdownOption[] = [
  { label: 'Alphabetical', value: 'name_asc' },
  { label: 'Gain/Loss (High → Low)', value: 'gain_desc' },
  { label: 'Current Price (High → Low)', value: 'current_desc' },
  { label: 'Current Price (Low → High)', value: 'current_asc' },
];

export const portfolioAssetActions: DropdownOption[] = [
  { label: 'Liquidate', value: 'liquidate' },
  { label: 'Combine', value: 'combine' },
  { label: 'Fractionalize', value: 'fractionalize' },
];
