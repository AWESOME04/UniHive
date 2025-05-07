import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardLayout from '../components/layout/DashboardLayout';
import AuthLayout from '../components/layout/AuthLayout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Messaging from '../pages/Messaging';
import CreateJobForm from '../components/jobs/CreateJobForm';
import SavedJobs from '../pages/SavedJobs';
import SearchFilter from '../pages/SearchFilter';
import AddJobPosting from '../pages/AddJobPosting';
import JobDetails from '../pages/JobDetails';
import JobApplication from '../pages/JobApplication';
import Universities from '../pages/Universities';
import OTPVerification from '../pages/OTPVerification';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Cookies from '../pages/Cookies';

const router = createBrowserRouter([
  // Public landing page
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'cookies',
        element: <Cookies />,
      },
    ],
  },

  // Authentication routes - public access with AuthLayout
  {
    element: <AuthLayout><Outlet /></AuthLayout>,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/otp-verification',
        element: <OTPVerification />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
    ]
  },
  
  // Main routes with standard layout - protected
  {
    path: '/app',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'universities',
        element: <Universities />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  
  // Dashboard routes - protected
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'settings',
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Dashboard />,
      },
      {
        path: 'earnings',
        element: <Dashboard />,
      },
      {
        path: 'notifications',
        element: <Dashboard />,
      },
      {
        path: 'help',
        element: <Dashboard />,
      },
      {
        path: 'create-job',
        element: <CreateJobForm />,
      },
      {
        path: 'messages',
        element: <Messaging />,
      },
      {
        path: 'saved-jobs',
        element: <SavedJobs />,
      },
      {
        path: 'search',
        element: <SearchFilter />,
      },
      {
        path: 'add-job',
        element: <AddJobPosting />,
      },
      {
        path: 'job/:id',
        element: <JobDetails />,
      },
      {
        path: 'task/:id',
        element: <JobDetails />,
      },
      {
        path: 'job/:id/apply',
        element: <JobApplication />,
      },
    ],
  },
  
  // Fallback route
  {
    path: '*',
    element: <AuthLayout><Login /></AuthLayout>
  }
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
