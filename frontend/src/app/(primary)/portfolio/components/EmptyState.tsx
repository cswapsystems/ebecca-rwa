'use client';

import React from 'react';
import { Button } from '@/components/common';
import { EmptyState as StyledEmptyState, EmptyTitle, EmptyText } from '../portfolioStyles';

const EmptyState: React.FC = () => {
  return (
    <StyledEmptyState>
      <EmptyTitle>No assets found</EmptyTitle>
      <EmptyText>Try adjusting your search or start exploring products.</EmptyText>
      <Button
        variant="primary"
        onClick={() => {
          window.location.href = '/product-browser';
        }}
      >
        Browse Products
      </Button>
    </StyledEmptyState>
  );
};

export default EmptyState;
