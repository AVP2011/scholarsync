// components/DonutChart.tsx
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }: { data: { high: number; medium: number; low: number } }) => {
  const chartData = {
    labels: ['High Trust', 'Medium Trust', 'Low Trust'],
    datasets: [
      {
        data: [data.high, data.medium, data.low],
        backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DonutChart;
