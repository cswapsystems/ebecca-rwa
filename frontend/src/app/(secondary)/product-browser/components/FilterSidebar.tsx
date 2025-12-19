import { useCallback, useMemo, useRef } from 'react';
import { FilterPanel } from '@/components/common';
import { productFilterSectionsData } from '@/mocks/productBrowser';
import type { FilterSidebarProps, FilterSection, FiltersState } from '../productBrowserTypes';
import { useMouseDragScroll } from '@/utils/domUtils';
import {
  Sidebar,
  SidebarHeader,
  SectionTitle,
  MobileFilterButton,
  FilterIcon,
  DesktopOnly,
  ClearLink,
  SidebarContent,
  MobileActiveFilters,
  FilterTagPill,
  FilterTagLabel,
  FilterTagRemove,
  FilterTagRemoveIcon,
} from '../productBrowserStyles';

type FilterTagType = 'subcategory' | 'kyc' | 'minPrice' | 'maxPrice';

interface ActiveFilterTag {
  id: string;
  type: FilterTagType;
  value: string;
  label: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export default function FilterSidebar({
  filters,
  onChange,
  hasActiveFilters,
  resultCount,
  onOpenMobile,
  onClear,
}: FilterSidebarProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dragHandlers = useMouseDragScroll(scrollContainerRef, { ignoreSelector: 'button' });

  const activeTags = useMemo<ActiveFilterTag[]>(() => {
    const tags: ActiveFilterTag[] = [];

    // Handle subcategory - check if it's an array or a single value
    if (filters.subcategory) {
      const subcategories = Array.isArray(filters.subcategory) 
        ? filters.subcategory 
        : [filters.subcategory];
      
      subcategories.forEach((value) => {
        tags.push({
          id: `subcategory-${value}`,
          type: 'subcategory',
          value: String(value),
          label: String(value),
        });
      });
    }

    // Handle kyc - check if it's an array or a single value
    if (filters.kyc) {
      const kycs = Array.isArray(filters.kyc) 
        ? filters.kyc 
        : [filters.kyc];
      
      kycs.forEach((value) => {
        tags.push({
          id: `kyc-${value}`,
          type: 'kyc',
          value: String(value),
          label: `KYC Requirement: ${value}`,
        });
      });
    }

    if (filters.minPrice > DEFAULT_MIN_PRICE) {
      tags.push({
        id: 'min-price',
        type: 'minPrice',
        value: String(filters.minPrice),
        label: `Min Price: $${filters.minPrice}`,
      });
    }

    if (filters.maxPrice < DEFAULT_MAX_PRICE) {
      tags.push({
        id: 'max-price',
        type: 'maxPrice',
        value: String(filters.maxPrice),
        label: `Max Price: $${filters.maxPrice}`,
      });
    }

    return tags;
  }, [filters]);

  const handleRemoveTag = useCallback(
    (tag: ActiveFilterTag) => {
      if (tag.type === 'subcategory' || tag.type === 'kyc') {
        const current = filters[tag.type];
        
        // Handle both array and single value cases
        if (Array.isArray(current)) {
          const nextValues = current.filter((value) => String(value) !== tag.value);
          onChange({
            ...filters,
            [tag.type]: nextValues.length > 0 ? nextValues : undefined,
          } as FiltersState);
        } else {
          // If it's a single value and matches, remove it (set to undefined)
          if (String(current) === tag.value) {
            onChange({
              ...filters,
              [tag.type]: undefined,
            } as FiltersState);
          }
        }
        return;
      }

      if (tag.type === 'minPrice') {
        onChange({
          ...filters,
          minPrice: DEFAULT_MIN_PRICE,
        });
        return;
      }

      if (tag.type === 'maxPrice') {
        onChange({
          ...filters,
          maxPrice: DEFAULT_MAX_PRICE,
        });
      }
    },
    [filters, onChange]
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SectionTitle>Filter Products</SectionTitle>
        <MobileFilterButton onClick={onOpenMobile} aria-label="Open filters">
          <FilterIcon src="/icons/filter.svg" alt="filter" />
        </MobileFilterButton>
        {hasActiveFilters && (
          <DesktopOnly>
            <ClearLink onClick={onClear}>Clear</ClearLink>
          </DesktopOnly>
        )}
      </SidebarHeader>

      {activeTags.length > 0 && (
        <MobileActiveFilters ref={scrollContainerRef} {...dragHandlers}>
          {activeTags.map((tag) => (
            <FilterTagPill key={tag.id}>
              <FilterTagLabel>{tag.label}</FilterTagLabel>
              <FilterTagRemove type="button" aria-label={`Remove ${tag.label}`} onClick={() => handleRemoveTag(tag)}>
                <FilterTagRemoveIcon src="/icons/close.svg" alt="" />
              </FilterTagRemove>
            </FilterTagPill>
          ))}
        </MobileActiveFilters>
      )}

      <SidebarContent>
        <FilterPanel
          onChange={(filters) => onChange(filters as FiltersState)}
          resultCount={resultCount}
          sections={productFilterSectionsData as unknown as FilterSection[]}
        />
      </SidebarContent>
    </Sidebar>
  );
}
