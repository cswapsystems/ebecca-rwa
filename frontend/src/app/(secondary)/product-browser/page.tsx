'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { productBrowserAssetsData, productCategoryDisplayMap } from '@/mocks/productBrowser';
import HeaderCarousel from './components/HeaderCarousel';
import FilterSidebar from './components/FilterSidebar';
import ProductsGrid from './components/ProductsGrid';
import MobileFilterModal from './components/MobileFilterModal';
import { PageContainer, ContentContainer, Content } from './productBrowserStyles';
import type { FiltersState, GridAsset, Category, Subcategory } from './productBrowserTypes';

const DEFAULT_FILTERS: FiltersState = {
  category: undefined,
  subcategory: undefined,
  kyc: undefined,
  minPrice: 0,
  maxPrice: 1000,
};

// Helper function to convert display name to category value
const displayNameToCategory = (displayName: string | undefined): Category | undefined => {
  if (!displayName) return undefined;
  const reverseMap: Record<string, Category> = {
    'Real Estate': 'real-estate',
    Commodities: 'commodities',
    TradFi: 'tradfi',
    Collectibles: 'collectibles',
  };
  return reverseMap[displayName];
};

// Helper function to convert category value to display name
const categoryToDisplayName = (category: Category | undefined): string | undefined => {
  if (!category) return undefined;
  return productCategoryDisplayMap[category];
};

// Helper function to convert category value from URL to display name
const categoryValueToDisplayName = (categoryValue: string | null): string | undefined => {
  if (!categoryValue) return undefined;
  const validCategories: Category[] = ['real-estate', 'commodities', 'tradfi', 'collectibles'];
  if (validCategories.includes(categoryValue as Category)) {
    return categoryToDisplayName(categoryValue as Category);
  }
  return undefined;
};

// Helper function to validate subcategory value from URL
const validateSubcategory = (subcategoryValue: string | null): Subcategory | undefined => {
  if (!subcategoryValue) return undefined;
  const validSubcategories: Subcategory[] = ['Vintage', 'Modern', 'Contemporary'];
  if (validSubcategories.includes(subcategoryValue as Subcategory)) {
    return subcategoryValue as Subcategory;
  }
  return undefined;
};

export default function ProduceBrowserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isInitializingFromURL = useRef(true);

  // Update URL with current filters
  const updateURL = useCallback(
    (newFilters: FiltersState) => {
      const params = new URLSearchParams();

      // Add category (convert display name back to value for URL)
      const categoryValue = displayNameToCategory(newFilters.category as unknown as string);
      if (categoryValue) {
        params.set('category', categoryValue);
      }

      // Add subcategory
      if (newFilters.subcategory) {
        params.set('subcategory', newFilters.subcategory);
      }

      // Add KYC requirement
      if (newFilters.kyc) {
        params.set('kyc', newFilters.kyc);
      }

      // Add price range (only if different from defaults)
      if (newFilters.minPrice !== DEFAULT_FILTERS.minPrice) {
        params.set('minPrice', newFilters.minPrice.toString());
      }
      if (newFilters.maxPrice !== DEFAULT_FILTERS.maxPrice) {
        params.set('maxPrice', newFilters.maxPrice.toString());
      }

      const queryString = params.toString();
      const newURL = queryString
        ? `${window.location.pathname}?${queryString}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;

      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  // Read filters from URL on mount and when URL changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    const kycParam = searchParams.get('kyc');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    // Also check hash for backward compatibility and navigation links
    const hash = window.location.hash.slice(1);
    const validCategories: Category[] = ['real-estate', 'commodities', 'tradfi', 'collectibles'];
    const categoryFromHash = hash && validCategories.includes(hash as Category) ? (hash as Category) : undefined;

    // If we have a hash but no category param, convert hash to query param
    if (categoryFromHash && !categoryParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', categoryFromHash);
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    const newFilters: FiltersState = {
      category: categoryParam
        ? (categoryValueToDisplayName(categoryParam) as unknown as Category)
        : categoryFromHash
          ? (categoryToDisplayName(categoryFromHash) as unknown as Category)
          : undefined,
      subcategory: validateSubcategory(subcategoryParam),
      kyc: (kycParam as 'Required' | 'Not Required') || undefined,
      minPrice: minPriceParam ? parseInt(minPriceParam, 10) : DEFAULT_FILTERS.minPrice,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam, 10) : DEFAULT_FILTERS.maxPrice,
    };

    isInitializingFromURL.current = true;
    setFilters(newFilters);
  }, [searchParams, router]);

  // Update URL when filters change (but not when initializing from URL)
  useEffect(() => {
    if (isInitializingFromURL.current) {
      isInitializingFromURL.current = false;
      return;
    }
    updateURL(filters);
  }, [filters, updateURL]);

  const filtered = useMemo(() => {
    return productBrowserAssetsData.filter((a) => {
      // Convert display name back to category value for comparison
      const categoryValue = displayNameToCategory(filters.category as unknown as string);
      if (categoryValue && a.category !== categoryValue) return false;
      if (filters.subcategory && a.subcategory !== filters.subcategory) return false;
      if (filters.kyc && a.kyc !== filters.kyc) return false;
      if (a.price < filters.minPrice || a.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.category !== DEFAULT_FILTERS.category ||
      filters.subcategory !== DEFAULT_FILTERS.subcategory ||
      filters.kyc !== DEFAULT_FILTERS.kyc ||
      filters.minPrice !== DEFAULT_FILTERS.minPrice ||
      filters.maxPrice !== DEFAULT_FILTERS.maxPrice
    );
  }, [filters]);

  return (
    <PageContainer>
      <HeaderCarousel />

      <ContentContainer>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          hasActiveFilters={hasActiveFilters}
          resultCount={filtered.length}
          onOpenMobile={() => setIsMobileFilterOpen(true)}
          onClear={() => {
            // Clear all filters
            router.replace(window.location.pathname, { scroll: false });
            setFilters(DEFAULT_FILTERS);
          }}
        />

        <Content>
          <ProductsGrid assets={filtered as unknown as GridAsset[]} />
        </Content>
      </ContentContainer>

      <MobileFilterModal
        open={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
        hasActiveFilters={hasActiveFilters}
        onClear={() => {
          // Clear all filters
          router.replace(window.location.pathname, { scroll: false });
          setFilters(DEFAULT_FILTERS);
        }}
      />
    </PageContainer>
  );
}
