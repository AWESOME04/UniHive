import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Layouts
import HomeLayout from './components/layout/HomeLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import OTPVerification from './pages/OTPVerification';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import NotFound from './pages/NotFound';

// ProtectedRoute
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with HomeLayout */}
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path="/about" element={<HomeLayout><About /></HomeLayout>} />
          <Route path="/contact" element={<HomeLayout><Contact /></HomeLayout>} />
          <Route path="/terms" element={<HomeLayout><Terms /></HomeLayout>} />
          <Route path="/privacy" element={<HomeLayout><Privacy /></HomeLayout>} />
          <Route path="/cookies" element={<HomeLayout><Cookies /></HomeLayout>} />
          <Route path="/universities" element={<HomeLayout><Universities /></HomeLayout>} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<HomeLayout><Login /></HomeLayout>} />
          <Route path="/register" element={<HomeLayout><Register /></HomeLayout>} />
          <Route path="/otp-verification" element={<HomeLayout><OTPVerification /></HomeLayout>} />
          <Route path="/forgot-password" element={<HomeLayout><ForgotPassword /></HomeLayout>} />
          <Route path="/reset-password" element={<HomeLayout><ResetPassword /></HomeLayout>} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
