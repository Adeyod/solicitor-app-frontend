import { Navigate } from 'react-router-dom';

type RoleProtectedRouteProps = {
  allowedRoles: string[];
  currentUserRole: string | undefined;
  children: JSX.Element;
};

const RoleBasedRoutes: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  currentUserRole,
  children,
}: RoleProtectedRouteProps) => {
  if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default RoleBasedRoutes;
