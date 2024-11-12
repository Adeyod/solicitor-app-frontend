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
  clients: safelyParseJSON(localStorage.getItem('clients')),
  singleClientDetails: safelyParseJSON(
    localStorage.getItem('singleClientDetails')
  ),
  totalClientsCount: safelyParseJSON(localStorage.getItem('totalClientsCount')),
  totalClientsPages: safelyParseJSON(localStorage.getItem('totalClientsPages')),
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    fetchClientsStart(state) {
      state.loading = true;
    },

    fetchClientsSuccess(state, action) {
      state.loading = false;

      const { clients } = action.payload;
      state.clients = clients.clients;
      state.totalClientsCount = clients.totalCount;
      state.totalClientsPages = clients.totalPages;

      localStorage.setItem('clients', JSON.stringify(state.clients));
      localStorage.setItem(
        'totalClientsCount',
        JSON.stringify(state.totalClientsCount)
      );
      localStorage.setItem(
        'totalClientsPages',
        JSON.stringify(state.totalClientsPages)
      );
    },

    fetchClientsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateClient(state, action) {
      state.loading = false;
      state.clients = action.payload;
      localStorage.setItem('clients', JSON.stringify(state.clients));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },

    getSingleClientDetails(state, action) {
      const { client } = action.payload;
      state.singleClientDetails = client;
      localStorage.setItem(
        'singleClientDetails',
        JSON.stringify(state.singleClientDetails)
      );
    },

    removeClients(state) {
      state.loading = false;
      state.clients = null;
      localStorage.removeItem('clients');
      localStorage.removeItem('singleClientDetails');
      localStorage.removeItem('totalClientsCount');
      localStorage.removeItem('totalClientsPages');
      state.error = null;
    },
  },
});

export const {
  removeClients,
  loadingStop,
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  updateClient,
  getSingleClientDetails,
} = clientSlice.actions;

export default clientSlice.reducer;
