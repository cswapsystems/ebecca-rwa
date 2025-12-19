'use client';

import React from 'react';
import { useTheme } from 'styled-components';
import { Legend, LegendItem, Dot, LegendPercent, LegendLabel } from '../portfolioStyles';
import { portfolioAllocations } from '@/mocks/portfolio';

const PortfolioLegend: React.FC = () => {
  const theme = useTheme();
  const legendColors = [theme.colors.primary800, theme.colors.primary300, theme.colors.primary100];

  return (
    <Legend>
      {portfolioAllocations.map((allocation, index) => (
        <LegendItem key={allocation.code}>
          <LegendLabel>
            <Dot $color={legendColors[index % legendColors.length]} /> {allocation.label}
          </LegendLabel>
          <LegendPercent>{allocation.percentage}%</LegendPercent>
        </LegendItem>
      ))}
    </Legend>
  );
};

export default PortfolioLegend;
