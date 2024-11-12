import { createSlice } from '@reduxjs/toolkit';

// Safely parse JSON to avoid errors
const safelyParseJSON = (item: string | null) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  cases: safelyParseJSON(localStorage.getItem('cases')),
  singleCaseDetails: safelyParseJSON(localStorage.getItem('singleCaseDetails')),
  totalCasesCount: safelyParseJSON(localStorage.getItem('totalCasesCount')),
  totalCasesPages: safelyParseJSON(localStorage.getItem('totalCasesPages')),
  loading: false,
  error: null,
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    fetchCasesStart(state) {
      state.loading = true;
    },

    fetchCasesSuccess(state, action) {
      state.loading = false;
      const { cases } = action.payload;

      state.cases = cases.result;
      state.totalCasesCount = cases.totalCount;
      state.totalCasesPages = cases.totalPages;
      localStorage.setItem('cases', JSON.stringify(state.cases));
      localStorage.setItem(
        'totalCasesCount',
        JSON.stringify(state.totalCasesCount)
      );
      localStorage.setItem(
        'totalCasesPages',
        JSON.stringify(state.totalCasesPages)
      );
    },

    fetchCasesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateCases(state, action) {
      state.loading = false;
      state.cases = action.payload;
      localStorage.setItem('cases', JSON.stringify(state.cases));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },

    getSingleCaseDetails(state, action) {
      // const { case } = action.payload;
      console.log('SLICE:', action.payload);
      state.singleCaseDetails = action.payload;
      localStorage.setItem(
        'singleCaseDetails',
        JSON.stringify(state.singleCaseDetails)
      );
    },

    removeCases(state) {
      state.loading = false;
      state.cases = null;
      localStorage.removeItem('cases');
      localStorage.removeItem('singleCaseDetails');
      localStorage.removeItem('totalCasesCount');
      localStorage.removeItem('totalCasesPages');
      state.error = null;
    },
  },
});

export const {
  getSingleCaseDetails,
  removeCases,
  loadingStop,
  fetchCasesStart,
  fetchCasesSuccess,
  fetchCasesFailure,
  updateCases,
} = caseSlice.actions;

export default caseSlice.reducer;
