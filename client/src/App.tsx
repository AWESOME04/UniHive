import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Layouts
import HomeLayout from './components/layout/HomeLayout';

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
import Jobs from './pages/Jobs';
import Messaging from './pages/Messaging';
import SavedJobs from './pages/SavedJobs';
import SearchFilter from './pages/SearchFilter';
import AddJobPosting from './pages/AddJobPosting';
import JobDetails from './pages/JobDetails';
import JobApplication from './pages/JobApplication';
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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/dashboard/messages" element={<ProtectedRoute><Messaging /></ProtectedRoute>} />
          <Route path="/dashboard/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
          <Route path="/dashboard/search" element={<ProtectedRoute><SearchFilter /></ProtectedRoute>} />
          <Route path="/dashboard/add-job" element={<ProtectedRoute><AddJobPosting /></ProtectedRoute>} />
          <Route path="/dashboard/job/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
          <Route path="/dashboard/job/:id/apply" element={<ProtectedRoute><JobApplication /></ProtectedRoute>} />
          
          {/* 404 Route */}
          <Route path="*" element={<HomeLayout><NotFound /></HomeLayout>} />
        </Routes>
        <ToastContainer position="bottom-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
