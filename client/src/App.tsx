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
import Pricing from './pages/Pricing'
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import OTPVerification from './pages/OTPVerification';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import NotFound from './pages/NotFound';

// Hives Pages
import Hives from './pages/Hives';
import Essentials from './pages/hives/Essentials';
import Academia from './pages/hives/Academia';
import Logistics from './pages/hives/Logistics';
import Buzz from './pages/hives/Buzz';
import ArchivePage from './pages/hives/Archive';
import SideHustle from './pages/hives/SideHustle';
import EssentialDetail from './pages/hives/EssentialDetail';
import Payments from './pages/Payments';
import Messages from './pages/Messages';

// Import new pages
import Settings from './pages/dashboard/Settings';
import HelpCenter from './pages/dashboard/HelpCenter';
import Favorites from './pages/dashboard/Favorites';
import FindServices from './pages/dashboard/FindServices';

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
          <Route path="/pricing" element={<HomeLayout><Pricing /></HomeLayout>} />
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
          
          {/* Hives Routes */}
          <Route path="/dashboard/hives" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Hives />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/essentials" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Essentials />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/essentials/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <EssentialDetail />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/academia" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Academia />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/academia/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Academia />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/logistics" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Logistics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/logistics/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Logistics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/buzz" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Buzz />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/buzz/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Buzz />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/archive" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ArchivePage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/archive/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ArchivePage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/sidehustle" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SideHustle />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hives/sidehustle/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SideHustle />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/payments" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Payments />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/messages" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Messages />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/help" element={
            <ProtectedRoute>
              <DashboardLayout>
                <HelpCenter />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/favorites" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Favorites />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/services" element={
            <ProtectedRoute>
              <DashboardLayout>
                <FindServices />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* 404 Route - Must be the last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
