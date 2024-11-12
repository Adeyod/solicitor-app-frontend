import NavBar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';
import Loginpage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ReportsPage from './pages/Admin/Reports/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import DocumentsPage from './pages/Admin/Documents/DocumentsPage';
import Appointments from './pages/Admin/Appointments/AppointmentsPage';
import CasesPage from './pages/Admin/Cases/CasesPage';
import ClientsPage from './pages/Admin/Clients/ClientsPage';
import Dashboard from './pages/Admin/Dashboard/AdminDashboardPage';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import { useSelector } from 'react-redux';
import { UserState } from './constants/types';
import CreateCase from './pages/Admin/Cases/CreateCase';
import ArchivedCases from './pages/Admin/Cases/ArchivedCases';
import RoleBasedRoutes from './components/RoleBasedRoutes';
import NotAuthorized from './pages/NotAuthorized';
import ClientDetails from './pages/Admin/Clients/ClientDetails';
import CaseDetails from './pages/Admin/Cases/CaseDetails';
import MyAppointments from './pages/Clients/Appointments/MyAppointments';

function App() {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <>
      <NavBar />
      <div className="flex h-screen ">
        {currentUser && <Sidebar />}
        <div className="flex-grow overflow-y-auto">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />

              <Route
                path="/admin/appointments"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <Appointments />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <ReportsPage />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <SettingsPage />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/documents"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <DocumentsPage />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/cases/all"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <CasesPage />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/cases/create-case/:clientId"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <CreateCase />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/case/:caseId"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <CaseDetails />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/cases/archived"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <ArchivedCases />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/clients"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <ClientsPage />
                  </RoleBasedRoutes>
                }
              />

              <Route
                path="/client/:clientId"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <ClientDetails />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['admin']}
                    currentUserRole={currentUser?.role}
                  >
                    <Dashboard />
                  </RoleBasedRoutes>
                }
              />

              <Route
                path="/client/my-appointments"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['client']}
                    currentUserRole={currentUser?.role}
                  >
                    <MyAppointments />
                  </RoleBasedRoutes>
                }
              />
              <Route
                path="/client/my-cases"
                element={
                  <RoleBasedRoutes
                    allowedRoles={['client']}
                    currentUserRole={currentUser?.role}
                  >
                    <MyAppointments />
                  </RoleBasedRoutes>
                }
              />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
