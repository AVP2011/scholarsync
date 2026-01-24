// components/LineChart.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = ({ data }: { data: { months: string[]; high: number[]; medium: number[]; low: number[] } }) => {
  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: 'High Trust',
        data: data.high,
        borderColor: '#22c55e',
        fill: false,
      },
      {
        label: 'Medium Trust',
        data: data.medium,
        borderColor: '#facc15',
        fill: false,
      },
      {
        label: 'Low Trust',
        data: data.low,
        borderColor: '#ef4444',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
