import './App.css';
import Homepage from './pages/Homepage';
import Layout from './layouts/Layout';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Useraccount from './pages/Useraccount';
import Adminaccount from './pages/Adminaccount';
import Agentaccount from './pages/Agentaccount';
import Recommendedreadpg from './pages/Recommendedreadpg';
import Bookingspg from './pages/Bookingspg';
import Settingspg from './pages/Settingspg';

// Import ToastContainer and toast styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Homepage /></Layout>} />
            <Route path="/recommended" element={<Layout><Recommendedreadpg /></Layout>} />
            <Route path="/manage/bookings" element={<Layout><Bookingspg /></Layout>} />
            <Route path="/settings" element={<Layout><Settingspg /></Layout>} />
            <Route path="/user/account" element={<Useraccount />} />
            <Route path="/admin/account" element={<Adminaccount />} />
            <Route path="/agent/account" element={<Agentaccount />} />
          </Routes>
        </BrowserRouter>

        {/* ToastContainer to render the toasts */}
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;

