import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import { Routes } from './services/networking';
import StreamerPage from './pages/StreamerPage';
import { ThemeProvider } from '@emotion/react';
import theme from './constants/theme';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router>
            <Route path={Routes.home} element={<HomePage />} />
            <Route path={`${Routes.home}/:id`} element={<StreamerPage />} />
          </Router>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
