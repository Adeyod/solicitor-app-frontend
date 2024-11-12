import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from '../constants/types';
import { useSelector } from 'react-redux';

type ProtectedRoutesProps = {
  children?: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  if (!currentUser || currentUser === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen ">
      <div className="flex-1 p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoutes;
