'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SearchBar, DropdownInput } from '@/components/common';
import { AssetsSection as StyledAssetsSection, SearchRow, SectionHeader, SectionTitle } from '../portfolioStyles';
import { PortfolioAsset } from '@/mocks/portfolio';
import { portfolioSortOptions } from '@/mocks/portfolio';
import AssetItem from './AssetItem';
import EmptyState from './EmptyState';

interface AssetsSectionProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  visibleAssets: PortfolioAsset[];
}

const AssetsSection: React.FC<AssetsSectionProps> = ({
  query,
  onQueryChange,
  onSortByChange,
  visibleAssets,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is inside any dropdown container or menu
      const clickedDropdown = (target as Element).closest('[data-dropdown-container]');

      if (!clickedDropdown && sectionRef.current && !sectionRef.current.contains(target)) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdownId]);

  const handleDropdownToggle = (dropdownId: string, expanded: boolean) => {
    if (expanded) {
      setOpenDropdownId(dropdownId);
    } else {
      setOpenDropdownId(null);
    }
  };

  return (
    <StyledAssetsSection ref={sectionRef}>
      <SectionHeader style={{ marginBottom: 16 }}>
        <SectionTitle>My Assets</SectionTitle>

        <SearchRow>
          <SearchBar
            value={query}
            onChange={onQueryChange}
            placeholder="Search Assets"
            iconSrc="/icons/search-portfolio.svg"
            iconAlt="search"
            iconSize={20}
          />
          <DropdownInput
            options={portfolioSortOptions}
            onOptionSelect={onSortByChange}
            placeholder="Sort By"
            padding={12}
            borderRadius={12}
            fontSize={14}
            fontWeight={600}
            keepPlaceholderOnSelect
          />
        </SearchRow>
      </SectionHeader>

      {visibleAssets.length === 0 ? (
        <EmptyState />
      ) : (
        visibleAssets.map((asset) => (
          <AssetItem
            key={asset.id}
            asset={asset}
            openDropdownId={openDropdownId}
            onDropdownToggle={handleDropdownToggle}
          />
        ))
      )}
    </StyledAssetsSection>
  );
};

export default AssetsSection;
