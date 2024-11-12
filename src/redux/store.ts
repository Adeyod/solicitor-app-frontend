import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import workerReducer from './workerSlice';
import clientReducer from './clientSlice';
import lawyerReducer from './lawyerSlice';
import CaseReducer from './caseSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    worker: workerReducer,
    client: clientReducer,
    lawyer: lawyerReducer,
    case: CaseReducer,
  },
});
