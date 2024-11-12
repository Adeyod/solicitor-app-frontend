import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from '../constants/types';
const PublicRoutes = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <div>
      {currentUser && currentUser !== null ? (
        <Navigate to="/profile" />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default PublicRoutes;
