import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, logoutSuccess } from '../redux/userSlice';
import axios from 'axios';
import { logoutRoute } from '../hooks/ApiRoutes';
import { removeCases } from '../redux/caseSlice';
import { removeLawyers } from '../redux/lawyerSlice';
import { removeClients } from '../redux/clientSlice';
import { removeWorkers } from '../redux/workerSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(loginStart());
    try {
      const { data } = await axios.get(logoutRoute);
      if (data) {
        dispatch(logoutSuccess());
        dispatch(removeCases());
        dispatch(removeLawyers());
        dispatch(removeClients());
        dispatch(removeWorkers());
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    }
  };
  return handleLogout;
};

export default LogoutComponent;
