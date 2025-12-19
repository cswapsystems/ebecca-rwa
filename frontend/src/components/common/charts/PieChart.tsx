'use client';

import type { FC, JSX } from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { Chart, ArcElement } from 'chart.js';
import type { ChartEvent, ActiveElement } from 'chart.js';

import { usePieInternals } from "@/hooks";

import { PieContainer } from './PieChartStyles';

Chart.register(ArcElement);

// TODO: Refine this type
export interface ChartData {
  label: string;
  code: string;
  total: number;
  percentage: number;
}

export interface PieChartProps {
  data: Array<ChartData>;
  size?: number;
  colors?: string[];
  cutout?: string | number;
}

const PieChart: FC<PieChartProps> = ({ data, size, colors, cutout = '45%' }): JSX.Element => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<ChartData | null>(null);

  const { pieContainerRef, storeRef, tooltipRef } = usePieInternals();

  const pieChartData = {
    labels: data.map((pie) => pie.label),
    datasets: [
      {
        data: data.map((pie) => pie.percentage),
        backgroundColor: colors ?? ['#4155FF', '#A5B4FC', '#E0E7FF', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    cutout,
    animation: {
      animateRotate: true,
      duration: 1000,
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    onHover: (event: ChartEvent, elements: ActiveElement[]) => {
      const canvas = pieContainerRef.current?.querySelector('canvas');
      if (!canvas || !event.native) return;

      const rect = canvas.getBoundingClientRect();
      const mouseEvent = event.native as MouseEvent;

      const mouseX = mouseEvent.clientX - rect.left;
      const mouseY = mouseEvent.clientY - rect.top;

      // Detect real movement (Chart.js may call onHover for reasons other than movement)
      const prev = storeRef.current.lastPos;
      const moved = Math.abs(mouseX - prev.x) + Math.abs(mouseY - prev.y) > 0.5;
      storeRef.current.lastPos = { x: mouseX, y: mouseY };

      if (moved && isTooltipVisible) setIsTooltipVisible(false);
      if (storeRef.current.idleTimer != null) {
        clearTimeout(storeRef.current.idleTimer);
        storeRef.current.idleTimer = null;
      }

      if (elements.length > 0) {
        const index = elements[0].index;
        const hoveredData = data[index];

        // Update tooltip content only if the hovered slice changed
        if (tooltip?.label !== hoveredData.label) {
          setTooltip(hoveredData);
        }

        // Start idle timer; only when the mouse stops moving will we show the tooltip
        storeRef.current.idleTimer = window.setTimeout(() => {
          if (tooltipRef.current) {
            const el = tooltipRef.current;
            el.style.setProperty('--x', `${storeRef.current.lastPos.x}px`);
            el.style.setProperty('--y', `${storeRef.current.lastPos.y}px`);
          }
          setIsTooltipVisible(true);
        }, 100);
      } else {
        setIsTooltipVisible(false);
      }
    },
  };

  return (
    <PieContainer ref={pieContainerRef} $size={size}>
      <Pie data={pieChartData} options={pieChartOptions} />
      {/* TODO: Add tooltip component here once design is ready */}
    </PieContainer>
  );
};

export default PieChart;
