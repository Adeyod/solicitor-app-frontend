import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

type ChartComponentProps<T extends ChartType> = {
  type: T;
  data: ChartData<T>;
  options?: ChartOptions<T>;
};

const ChartComponent = <T extends ChartType>({
  type,
  data,
  options,
}: ChartComponentProps<T>) => {
  switch (type) {
    case 'bar':
      return (
        <div className="max-w-[90%]">
          <Bar
            data={data as ChartData<'bar'>}
            options={options as ChartOptions<'bar'>}
          />
        </div>
      );
    case 'line':
      return (
        <div className="max-w-[90%]">
          <Line
            data={data as ChartData<'line'>}
            options={options as ChartOptions<'line'>}
          />
        </div>
      );
    case 'pie':
      return (
        <div className="max-w-[90%]">
          <Pie
            data={data as ChartData<'pie'>}
            options={options as ChartOptions<'pie'>}
          />
        </div>
      );
    case 'doughnut':
      return (
        <div className="max-w-[100%]">
          <Doughnut
            data={data as ChartData<'doughnut'>}
            options={options as ChartOptions<'doughnut'>}
          />
        </div>
      );
    default:
      return null;
  }
};

export default ChartComponent;
