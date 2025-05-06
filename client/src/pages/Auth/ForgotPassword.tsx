import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac\.[a-zA-Z]{2,})$/, 'Must be a valid university email')
    .required('Required'),
});

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success('Reset link sent! Check your email');
    } catch (err) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl-soft p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">Enter the email address you used when you joined and we'll send you instructions to reset your password.</p>
        </div>
        
        {!isSubmitted ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="uni.student@school.edu"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-default"
                  >
                    {loading ? 'Sending...' : 'RESET PASSWORD'}
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <Link to="/login" className="font-medium text-secondary hover:text-opacity-90">
                    BACK TO LOGIN
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="text-center">
            <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700 mb-6">Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.</p>
            <Link
              to="/login"
              className="w-full inline-block text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-default"
            >
              BACK TO LOGIN
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
