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
  workers: safelyParseJSON(localStorage.getItem('workers')),
  totalWorkersCount: safelyParseJSON(localStorage.getItem('totalWorkersCount')),
  totalWorkersPages: safelyParseJSON(localStorage.getItem('totalWorkersPages')),
  loading: false,
  error: null,
};

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    fetchWorkersStart(state) {
      state.loading = true;
    },

    fetchWorkersSuccess(state, action) {
      state.loading = false;

      const { workers } = action.payload;
      state.workers = workers.workers;

      state.totalWorkersCount = workers.totalCount;
      state.totalWorkersPages = workers.totalPages;

      localStorage.setItem('workers', JSON.stringify(state.workers));
      localStorage.setItem(
        'totalWorkersCount',
        JSON.stringify(state.totalWorkersCount)
      );
      localStorage.setItem(
        'totalWorkersPages',
        JSON.stringify(state.totalWorkersPages)
      );
    },

    fetchWorkersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateWorkers(state, action) {
      state.loading = false;
      state.workers = action.payload;
      localStorage.setItem('workers', JSON.stringify(state.workers));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },

    removeWorkers(state) {
      state.loading = false;
      state.workers = null;
      localStorage.removeItem('workers');
      localStorage.removeItem('totalWorkersPages');
      localStorage.removeItem('totalWorkersCount');
      state.error = null;
    },
  },
});

export const {
  removeWorkers,
  loadingStop,
  fetchWorkersStart,
  fetchWorkersSuccess,
  fetchWorkersFailure,
  updateWorkers,
} = workerSlice.actions;

export default workerSlice.reducer;
