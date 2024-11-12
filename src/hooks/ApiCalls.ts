import axios from 'axios';
import {
  createCaseRoute,
  getCaseDetailsByIdForAdminRoute,
  getClientDetailsByIdForAdminRoute,
  getTotalAppointmentsRoute,
  getTotalCasesRoute,
  getTotalClientsRoute,
  getTotalLawyersRoute,
  getTotalWorkersRoute,
  getUserProfileRoute,
  LoginRoute,
} from './ApiRoutes';
import { useSelector } from 'react-redux';
import { UserState, NewCaseProp, LoginFormData } from '../constants/types';

const useHeader = () => {
  const { access } = useSelector((state: { user: UserState }) => state.user);

  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access}`,
  };

  const header2 = {
    Authorization: `Bearer ${access}`,
  };

  const logUserIn = async (formData: LoginFormData) => {
    try {
      const response = await axios.post(LoginRoute, formData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    try {
      console.log('i am trying to fetch user profile');
      const response = await axios(getUserProfileRoute, {
        headers: header,
      });

      console.log('FETCH PROFILE:', response);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createNewCase = async (payload: NewCaseProp | FormData) => {
    console.log('payload:', payload);
    try {
      const response = await axios.post(createCaseRoute, payload, {
        headers: header2,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getClientDetails = async (clientId: string) => {
    try {
      console.log(clientId);
      const response = await axios.get(
        `${getClientDetailsByIdForAdminRoute}${clientId}`,
        {
          headers: header,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCaseDetails = async (caseId: string) => {
    try {
      console.log('API CALL:', caseId);
      const response = await axios.get(
        `${getCaseDetailsByIdForAdminRoute}${caseId}`,
        {
          headers: header,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTotalCases = async (
    page: string,
    limit: string,
    searchValue: string
  ) => {
    try {
      const response = await axios(
        `${getTotalCasesRoute}?searchParams=${searchValue}&page=${page}&${limit}`,
        {
          headers: header,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTotalClients = async (
    page: string,
    limit: string,
    searchValue: string
  ) => {
    try {
      const response = await axios(
        `${getTotalClientsRoute}?searchParams=${searchValue}&page=${page}&${limit}`,
        {
          headers: header,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTotalWorkers = async () => {
    try {
      const response = await axios(getTotalWorkersRoute, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTotalLawyers = async () => {
    try {
      const response = await axios(getTotalLawyersRoute, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTotalAppointments = async () => {
    try {
      const response = await axios(getTotalAppointmentsRoute, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getCaseDetails,
    logUserIn,
    fetchUserProfile,
    createNewCase,
    getTotalCases,
    getTotalClients,
    getTotalWorkers,
    getTotalLawyers,
    getTotalAppointments,
    getClientDetails,
  };
};

export default useHeader;
