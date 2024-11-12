import { useDispatch, useSelector } from 'react-redux';
import ChartComponent from '../../../components/charts/ChartComponent';
import { fetchCasesSuccess } from '../../../redux/caseSlice';
import { useEffect, useState } from 'react';
import useHeader from '../../../hooks/ApiCalls';
import { CasesState } from '../../../constants/types';
import Spinner from '../../../components/Spinner';
import Search from '../../../components/Search';
import useDebounce from '../../../hooks/UseDebounce';
import { Link } from 'react-router-dom';
import CasesCard from '../../../components/dashboard/CasesCard';
import SmallSpinner from '../../../components/SmallSpinner';

const CasesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { getTotalCases } = useHeader();

  const { cases, totalCasesCount } = useSelector(
    (state: { case: CasesState }) => state.case
  );

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(totalCasesCount / Number(limit));

  const fetchCasesData = async (searchValue: string) => {
    try {
      const casesResponse = await getTotalCases(
        page.toString(),
        limit,
        searchValue
      );

      console.log(casesResponse);

      if (casesResponse) {
        dispatch(fetchCasesSuccess(casesResponse));
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
      fetchCasesData(debouncedSearchValue);
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
    fetchCasesData(searchValue);
    setLoading(false);
  }, [page, location.pathname, limit, searchValue]);

  const chartData = {
    labels: ['Cases', 'Lawyers', 'cases', 'Workers'],
    datasets: [
      {
        label: 'Count',
        data: [totalCasesCount],
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
        <div className="p-4 max-w-[90%]">
          <h1 className="text-2xl font-bold mb-4">cases</h1>

          {/* Key Metrics */}
          <div className="flex flex-col mmg:flex-row items-center justify-between">
            <div className="max-w-[90vw] w-full lg:max-w-[60%]">
              <CasesCard cases={cases} totalCasesCount={totalCasesCount} />
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
                  e.key === 'Enter' && fetchCasesData(searchValue)
                }
                setSearchValue={setSearchValue}
              />
            </div>

            <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
              <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Case Title
                    </th>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Case Type
                    </th>
                    <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                      Case Number
                    </th>

                    <th className="px-2 md:px-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Details
                    </th>
                    <th className="px-2 md:px-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <td colSpan={6} className="text-center">
                      <SmallSpinner />
                    </td>
                  ) : cases.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no cases yet 😑
                      </td>
                    </tr>
                  ) : (
                    cases.map((caseType, index) => (
                      <tr key={index}>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {caseType?.case_title}
                        </td>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {caseType?.case_type}
                        </td>
                        <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {caseType?.case_number}
                        </td>

                        <td className="px-2 md:px-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base underline">
                          <Link to={`/admin/case/${caseType?._id}`}>
                            View details
                          </Link>
                        </td>
                        <td className="px-2 md:px-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base underline">
                          <button>Delete case</button>
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

export default CasesPage;
