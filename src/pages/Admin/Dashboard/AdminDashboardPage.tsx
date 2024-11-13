import { useState, useEffect } from 'react';
import Card from '../../../components/dashboard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsSuccess } from '../../../redux/clientSlice';
import { fetchLawyersSuccess } from '../../../redux/lawyerSlice';
import { fetchWorkersSuccess } from '../../../redux/workerSlice';
import { fetchCasesSuccess } from '../../../redux/caseSlice';
import Spinner from '../../../components/Spinner';
import {
  CasesState,
  ClientsState,
  LawyersState,
  WorkersState,
} from '../../../constants/types';
import ChartComponent from '../../../components/charts/ChartComponent';
import useHeader from '../../../hooks/ApiCalls';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { getTotalCases, getTotalClients, getTotalLawyers, getTotalWorkers } =
    useHeader();

  const { cases, totalCasesCount } = useSelector(
    (state: { case: CasesState }) => state.case
  );

  const { totalLawyersCount } = useSelector(
    (state: { lawyer: LawyersState }) => state.lawyer
  );

  const { totalClientsCount } = useSelector(
    (state: { client: ClientsState }) => state.client
  );

  const { totalWorkersCount } = useSelector(
    (state: { worker: WorkersState }) => state.worker
  );

  const page = '';
  const limit = '';
  const searchValue = '';

  const fetchNeededData = async () => {
    try {
      const [
        casesResponse,
        clientsResponse,
        workersResponse,
        lawyersResponse,
        // appointmentsResponse,
      ] = await Promise.all([
        getTotalCases(page, limit, searchValue),
        getTotalClients(page, limit, searchValue),
        getTotalWorkers(),
        getTotalLawyers(),
        // getTotalAppointments(),
      ]);

      dispatch(fetchCasesSuccess(casesResponse));
      dispatch(fetchClientsSuccess(clientsResponse));
      dispatch(fetchWorkersSuccess(workersResponse));
      dispatch(fetchLawyersSuccess(lawyersResponse));

      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const chartData = {
    labels: ['Cases', 'Lawyers', 'Clients', 'Workers'],
    datasets: [
      {
        label: 'Count',
        data: [
          totalCasesCount,
          totalLawyersCount,
          totalClientsCount,
          totalWorkersCount,
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
      },
    ],
  };

  const ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="smm:p-4 w-[90%]">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {/* Key Metrics */}
          <div className="">
            <Card
              totalCasesCount={totalCasesCount}
              cases={cases}
              totalWorkersCount={totalWorkersCount}
              totalLawyersCount={totalLawyersCount}
              totalClientsCount={totalClientsCount}
            />
          </div>

          {/* Chart */}
          <div className="mb-[120px] smm:w-[30rem]">
            <h2 className="text-[13px] smm:text-xl font-semibold mb-4">
              Overview of Data
            </h2>
            <div className="w-[20rem] smm:w-full">
              <ChartComponent
                type="doughnut"
                data={chartData}
                options={ChartOptions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
