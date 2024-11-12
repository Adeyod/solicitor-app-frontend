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
  lawyers: safelyParseJSON(localStorage.getItem('lawyers')),
  totalLawyersCount: safelyParseJSON(localStorage.getItem('totalLawyersCount')),
  totalLawyersPages: safelyParseJSON(localStorage.getItem('totalLawyersPages')),
  loading: false,
  error: null,
};

const lawyerSlice = createSlice({
  name: 'lawyers',
  initialState,
  reducers: {
    fetchLawyersStart(state) {
      state.loading = true;
    },

    fetchLawyersSuccess(state, action) {
      state.loading = false;
      const { lawyers } = action.payload;
      console.log('LAWYER:', lawyers.lawyers);
      console.log('LAWYER SLICE:', action.payload);
      state.lawyers = lawyers.lawyers;
      state.totalLawyersCount = lawyers.totalCount;
      state.totalLawyersPages = lawyers.totalPages;

      localStorage.setItem('lawyers', JSON.stringify(state.lawyers));
      localStorage.setItem(
        'totalLawyersCount',
        JSON.stringify(state.totalLawyersCount)
      );
      localStorage.setItem(
        'totalLawyersPages',
        JSON.stringify(state.totalLawyersPages)
      );
    },

    fetchLawyersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateLawyers(state, action) {
      state.loading = false;
      state.lawyers = action.payload;
      localStorage.setItem('lawyers', JSON.stringify(state.lawyers));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },

    removeLawyers(state) {
      state.loading = false;
      state.lawyers = null;
      localStorage.removeItem('lawyers');
      localStorage.removeItem('totalLawyersCount');
      localStorage.removeItem('totalLawyersPages');
      state.error = null;
    },
  },
});

export const {
  removeLawyers,
  loadingStop,
  fetchLawyersStart,
  fetchLawyersSuccess,
  fetchLawyersFailure,
  updateLawyers,
} = lawyerSlice.actions;

export default lawyerSlice.reducer;
