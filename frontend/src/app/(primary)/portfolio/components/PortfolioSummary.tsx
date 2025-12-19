'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { PieChart } from '@/components/common';
import Flex from '@/components/primitives/flex/Flex';
import PortfolioLegend from './PortfolioLegend';
import { SummaryGrid, SummaryCard, SummaryValue, SummaryLabel, SummaryRow } from '../portfolioStyles';
import { portfolioAllocations, portfolioSummary } from '@/mocks/portfolio';

const PortfolioSummary: React.FC = () => {
  const theme = useTheme();
  const { totalValue, allAssetsVal, purchaseCost, gainPct } = portfolioSummary;

  return (
    <SummaryGrid>
      <SummaryCard>
        <SummaryRow>
          <PieChart
            data={portfolioAllocations}
            size={84}
            colors={[theme.colors.primary100, theme.colors.primary300, theme.colors.primary800]}
            cutout={'50%'}
          />
          <Flex.Column rowGap={6}>
            <PortfolioLegend />
            <Flex.Row columnGap={24}></Flex.Row>
          </Flex.Column>
        </SummaryRow>
      </SummaryCard>

      <SummaryCard>
        <SummaryLabel>Total Value</SummaryLabel>
        <SummaryValue>
          $ {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryLabel>All Assets</SummaryLabel>
        <SummaryValue>
          $ {allAssetsVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryLabel>Total Purchase Cost</SummaryLabel>
        <SummaryValue>
          $ {purchaseCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </SummaryValue>
      </SummaryCard>

      <SummaryCard>
        <SummaryLabel>Gain/Loss</SummaryLabel>
        <SummaryValue>+{gainPct.toFixed(2)}%</SummaryValue>
      </SummaryCard>
    </SummaryGrid>
  );
};

export default PortfolioSummary;
