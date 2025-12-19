import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Chart,
  type ChartOptions,
} from 'chart.js';

import { StyledProductChartContainer } from './StyledElements';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const chartAreaBg = {
  id: 'chartAreaBg',
  beforeDraw: (chart: Chart) => {
    if (!chart.chartArea) return;
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.fillStyle = '#f7f9fc';
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    ctx.restore();
  },
};

// TODO: Replace static data upon integration
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  datasets: [
    {
      label: 'Product Data',
      data: [10, 20, 15, 25, 18, 30],
      fill: true,
      borderColor: 'rgba(52, 175, 247, 1)',
      backgroundColor: 'rgba(52, 175, 247, 0.10)',
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: { display: false },
    tooltip: { intersect: false },
  },

  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: { display: false },
    },
  },

  elements: {
    line: { borderWidth: 2 },
    point: { radius: 0 },
  },
};

export default function ProductInvestmentDataProductChart() {
  return (
    <StyledProductChartContainer>
      <Line data={data} options={options} plugins={[chartAreaBg]} />
    </StyledProductChartContainer>
  );
}
