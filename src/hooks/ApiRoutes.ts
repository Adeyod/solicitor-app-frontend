// const host = 'http://localhost:1010/api';
const host = 'https://solicitor-app-backend.onrender.com/api';

const RegisterRoute = `${host}/auth/register`;
const logoutRoute = `${host}/auth/logout`;
const LoginRoute = `${host}/auth/login`;
const EmailVerificationRoute = `${host}/auth/email-verification`;
const getTotalCasesRoute = `${host}/cases/all-cases`;

const getTotalClientsRoute = `${host}/users/all-clients`;
const getClientDetailsByIdForAdminRoute = `${host}/users/client/`;
const getTotalWorkersRoute = `${host}/users/all-workers`;
const getTotalLawyersRoute = `${host}/users/all-lawyers`;
const getTotalAppointmentsRoute = `${host}/cases/all-cases`;
const getCaseDetailsByIdForAdminRoute = `${host}/cases/single-case/`;
const createCaseRoute = `${host}/cases/create-case`;
const getUserProfileRoute = `${host}/users/get-user-details`;

export {
  getCaseDetailsByIdForAdminRoute,
  getUserProfileRoute,
  createCaseRoute,
  getClientDetailsByIdForAdminRoute,
  getTotalCasesRoute,
  LoginRoute,
  EmailVerificationRoute,
  RegisterRoute,
  logoutRoute,
  getTotalClientsRoute,
  getTotalWorkersRoute,
  getTotalLawyersRoute,
  getTotalAppointmentsRoute,
};
