'use client';

import React from 'react';
import Image from 'next/image';
import { SearchBarContainer, SearchInput, SearchIcon } from './SearchBarStyles';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
  icon?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  iconSize?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search',
  width = '100%',
  icon,
  iconSrc = '/icons/header/search.svg',
  iconAlt = 'search',
  iconSize = 16,
}) => {
  return (
    <SearchBarContainer $width={width}>
      <SearchIcon>{icon ?? <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />}</SearchIcon>
      <SearchInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
