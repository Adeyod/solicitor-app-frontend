import { useDispatch, useSelector } from 'react-redux';

import { fetchClientsSuccess } from '../../../redux/clientSlice';
import useHeader from '../../../hooks/ApiCalls';
import Spinner from '../../../components/Spinner';
import { ClientsState } from '../../../constants/types';
import { useEffect, useState } from 'react';
import ClientsCard from '../../../components/dashboard/ClientsCard';
import ChartComponent from '../../../components/charts/ChartComponent';
import useDebounce from '../../../hooks/UseDebounce';
import Search from '../../../components/Search';
import { Link } from 'react-router-dom';
import SmallSpinner from '../../../components/SmallSpinner';

const ClientsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { clients, totalClientsCount } = useSelector(
    (state: { client: ClientsState }) => state.client
  );

  const { getTotalClients } = useHeader();

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(totalClientsCount / Number(limit));

  const fetchClientsData = async (searchValue: string) => {
    try {
      const clientsResponse = await getTotalClients(
        page.toString(),
        limit,
        searchValue
      );

      console.log(clientsResponse);

      if (clientsResponse) {
        dispatch(fetchClientsSuccess(clientsResponse));
      }

      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      fetchClientsData(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('limit', limit.toString());
    console.log('I am running');

    if (searchValue) {
      queryParams.set('search', searchValue);
    }

    console.log('Updated URL Params:', queryParams.toString());
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );
    fetchClientsData(searchValue);
    setLoading(false);
  }, [page, location.pathname, limit, searchValue]);

  const chartData = {
    labels: ['Client count', 'Verified Clients', 'Unverified Clients'],
    datasets: [
      {
        label: 'Count',
        data: [totalClientsCount],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
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
        <div className="p-4 max-w-[90%]">
          <h1 className="text-2xl font-bold mb-4">Clients</h1>

          {/* Key Metrics */}
          <div className="flex flex-col mmg:flex-row items-center justify-between">
            <div className="max-w-[90vw] w-full lg:max-w-[60%]">
              <ClientsCard
                clients={clients}
                totalClientsCount={totalClientsCount}
              />
            </div>

            <div className="flex flex-col w-[50%] lg:max-w-[90%] items-center">
              <h2 className="text-xl font-semibold mb-4">Overview of Data</h2>
              <ChartComponent
                type="doughnut"
                data={chartData}
                options={ChartOptions}
              />
            </div>
          </div>

          <div>
            <div className="my-10 flex justify-center">
              <Search
                searchValue={searchValue}
                handleKeyPress={(e) =>
                  e.key === 'Enter' && fetchClientsData(searchValue)
                }
                setSearchValue={setSearchValue}
              />
            </div>

            <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
              <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      First Name
                    </th>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Last Name
                    </th>
                    <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                      User name
                    </th>

                    <th className="px-2 md:px-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <SmallSpinner />
                      </td>
                    </tr>
                  ) : clients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no clients yet 😑
                      </td>
                    </tr>
                  ) : (
                    clients.map((client, index) => (
                      <tr key={index}>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {client?.first_name}
                        </td>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {client?.last_name}
                        </td>
                        <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {client?.user_name}
                        </td>

                        <td className="px-2 md:px-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base underline">
                          <Link to={`/client/${client?._id}`}>
                            View details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mb-20 flex justify-between items-center w-full px-4 mt-5">
              <div className="flex gap-4">
                {page > 1 && (
                  <button
                    className="bg-primary p-2 rounded-lg font-bold text-white"
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                )}
                {page < totalPages && (
                  <button
                    className="bg-primary p-2 rounded-lg font-bold text-white"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
              <div>
                Page {page} of {totalPages}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientsPage;
