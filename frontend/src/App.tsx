import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Nav } from './components/common/Nav';
import { AppRoutes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Nav />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
