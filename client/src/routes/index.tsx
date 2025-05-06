import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Profile from '../pages/Profile';
import Login from '../pages/Auth/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Messaging from '../pages/Messaging';
import CreateJobForm from '../components/jobs/CreateJobForm';
import SavedJobs from '../pages/SavedJobs';
import SearchFilter from '../pages/SearchFilter';
import AddJobPosting from '../pages/AddJobPosting';
import Authentication from '../pages/Authentication';
import JobDetails from '../pages/JobDetails';
import JobApplication from '../pages/JobApplication';
import Universities from '../pages/Universities';
import OTPVerification from '../pages/OTPVerification';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'jobs',
        element: (
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-job',
        element: (
          <ProtectedRoute>
            <CreateJobForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'messages',
        element: (
          <ProtectedRoute>
            <Messaging />
          </ProtectedRoute>
        ),
      },
      {
        path: 'messages/:id',
        element: (
          <ProtectedRoute>
            <Messaging />
          </ProtectedRoute>
        ),
      },
      {
        path: 'saved-jobs',
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'search',
        element: (
          <ProtectedRoute>
            <SearchFilter />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-job',
        element: (
          <ProtectedRoute>
            <AddJobPosting />
          </ProtectedRoute>
        ),
      },
      {
        path: 'job/:id',
        element: (
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'job/:id/apply',
        element: (
          <ProtectedRoute>
            <JobApplication />
          </ProtectedRoute>
        ),
      },
      {
        path: 'auth',
        element: <Authentication />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'otp-verification',
        element: <OTPVerification />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'universities',
        element: (
          <ProtectedRoute>
            <Universities />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function AppRouter() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default AppRouter;
