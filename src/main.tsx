// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

// createRoot(document.getElementById('root')!).render(
//   // <StrictMode>
//   <>
//     <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//     />
//     <BrowserRouter>
//       <Provider store={store}>
//       <App />
//       </Provider>
//     </BrowserRouter>
//     </>
//   {/* </StrictMode> */}
// );

// <React.StrictMode>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
);
{
  /* </React.StrictMode> */
}
