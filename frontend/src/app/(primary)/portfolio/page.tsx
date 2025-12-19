'use client';

import { Button } from "@/components/common";
import { useRouter } from "next/navigation";
import { useMemo, useState } from 'react';
import { PageContainer, TitleContainer, PageTitle } from './portfolioStyles';
import { portfolioAssets } from '@/mocks/portfolio';
import PortfolioSummary from './components/PortfolioSummary';
import AssetsSection from './components/AssetsSection';

export default function PortfolioPage() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('');

  const visibleAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? portfolioAssets.filter((a) => a.title.toLowerCase().includes(q)) : portfolioAssets;

    const sorted = [...base];
    switch (sortBy) {
      case 'name_asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'gain_desc':
        sorted.sort((a, b) => (b.gainPct ?? 0) - (a.gainPct ?? 0));
        break;
      case 'current_desc':
        sorted.sort((a, b) => (b.current ?? 0) - (a.current ?? 0));
        break;
      case 'current_asc':
        sorted.sort((a, b) => (a.current ?? 0) - (b.current ?? 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [query, sortBy]);

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitle>Portfolio Summary</PageTitle>

        <Button
          variant="primary"
          onClick={() => router.push("/asset")}
        >
          Create New Asset
        </Button>
      </TitleContainer>

      <PortfolioSummary />

      <AssetsSection
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        visibleAssets={visibleAssets}
      />
    </PageContainer>
  );
}
