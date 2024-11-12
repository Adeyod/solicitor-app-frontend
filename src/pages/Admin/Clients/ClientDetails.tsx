import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleClientDetails } from '../../../redux/clientSlice';
import useHeader from '../../../hooks/ApiCalls';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { ClientsState } from '../../../constants/types';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
} from '../../../constants/styles';

const ClientDetails = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { clientId } = useParams();

  const { getClientDetails } = useHeader();

  const { singleClientDetails } = useSelector(
    (state: { client: ClientsState }) => state.client
  );

  const getSingleClient = async () => {
    try {
      setLoading(true);

      if (!clientId) {
        return null;
      }

      const response = await getClientDetails(clientId);

      if (response) {
        dispatch(getSingleClientDetails(response));
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
    getSingleClient();
  }, [clientId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-10 uppercase italic mb-5 underline font-bold text-xl md:text-2xl lg:text-3xl">
            Client Details
          </p>

          <div className="flex flex-col items-center">
            <div className="pl-2 md:text-xl lg:text-2xl">
              <div className="flex flex-col text-[16px] items-start">
                <p className="">
                  <span className="uppercase font-bold italic">
                    First name:{' '}
                  </span>
                  {singleClientDetails?.first_name}
                </p>
                <p className="">
                  <span className="uppercase font-bold italic">
                    last name:{' '}
                  </span>
                  {singleClientDetails?.last_name}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    user name:{' '}
                  </span>

                  {singleClientDetails?.user_name}
                </p>
              </div>

              <div className="flex gap-10 text-[16px]">
                <p className="text-[16px]">
                  <span className="uppercase font-bold italic">
                    Phone number:{' '}
                  </span>
                  {singleClientDetails?.phone_number}
                </p>
              </div>

              <div className="flex flex-col items-start text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">email: </span>
                  {singleClientDetails?.email}
                </p>
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">role: </span>
                  {singleClientDetails?.role}
                </p>
              </div>
            </div>
            <div className={RegisterButtonContainerStyle}>
              <Link
                className={RegisterButtonStyle}
                to={`/admin/cases/create-case/${singleClientDetails?._id}`}
              >
                Create case for this client
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientDetails;
