import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useHeader from '../../../hooks/ApiCalls';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { CasesState } from '../../../constants/types';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
} from '../../../constants/styles';
import { getSingleCaseDetails } from '../../../redux/caseSlice';

const CaseDetails = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { caseId } = useParams();

  const { getCaseDetails } = useHeader();

  const { singleCaseDetails } = useSelector(
    (state: { case: CasesState }) => state.case
  );

  const getSingleCase = async () => {
    try {
      setLoading(true);

      if (!caseId) {
        return null;
      }

      const response = await getCaseDetails(caseId);
      console.log(response.case);

      if (response) {
        dispatch(getSingleCaseDetails(response.case));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCase();
  }, [caseId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-10 uppercase italic mb-5 underline font-bold text-xl md:text-2xl lg:text-3xl">
            Case Details
          </p>

          <div className="flex flex-col items-center">
            <div className="pl-2 md:text-xl lg:text-2xl">
              <div className="flex flex-col text-[16px] items-start">
                <p className="">
                  <span className="uppercase font-bold italic">
                    Case Title:{' '}
                  </span>
                  {singleCaseDetails?.case_title}
                </p>
                <p className="">
                  <span className="uppercase font-bold italic">
                    Case Type:{' '}
                  </span>
                  {singleCaseDetails?.case_type}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    Case number:{' '}
                  </span>

                  {singleCaseDetails?.case_number}
                </p>
              </div>

              <div className="flex gap-10 text-[16px]">
                <p className="text-[16px]">
                  <span className="uppercase font-bold italic">
                    Case Status:{' '}
                  </span>
                  {singleCaseDetails?.status}
                </p>
              </div>

              <div className="flex flex-col items-start text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">
                    Descrition:{' '}
                  </span>
                  {singleCaseDetails?.description}
                </p>
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">
                    Client name:{' '}
                  </span>
                  {`${singleCaseDetails?.client?.first_name} ${singleCaseDetails?.client?.last_name}`}
                </p>

                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">
                    Lawyer in Charge:{' '}
                  </span>
                  {`${singleCaseDetails?.lawyer_in_charge?.first_name} ${singleCaseDetails?.lawyer_in_charge?.last_name}`}
                </p>
              </div>
            </div>
            <div className={RegisterButtonContainerStyle}>
              <Link className={RegisterButtonStyle} to={'#'}>
                View Case Documents
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseDetails;
