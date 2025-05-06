import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../store';
import { setCredentials } from '../store/slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, GraduationCap, Users } from 'lucide-react';

const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac\.[a-zA-Z]{2,})$/, 'Must be a valid university email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add cursor effect listener
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.head.removeChild(link);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async (
    values: RegisterFormValues, 
    { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    setLoading(true);
    setStatus(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const userData = {
        id: '123',
        username: values.fullName,
        email: values.email,
      };
      
      dispatch(
        setCredentials({
          user: userData,
          token: 'fake-token-12345',
        })
      );
      
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      setStatus('Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cursor light effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 opacity-70 hidden md:block" 
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 69, 0, 0.15), transparent 80%)`
        }}
      />
      
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-secondary opacity-10">
        <GraduationCap size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-accent-purple opacity-10">
        <Users size={100} />
      </div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo and branding */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl -rotate-12 animate-float">
            UH
          </div>
        </div>
        
        {/* Card with morphism effect */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]">
          {/* Background patterns */}
          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5"></div>
          
          <div className="text-center mb-6 relative">
            <h2 className="text-4xl font-bold text-primary mb-2">Create an Account</h2>
            <p className="mt-2 text-gray-600">Join your class now, discover new opportunities, and start your journey today!</p>
            <div className="mt-4 flex justify-center">
              <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md transform transition-transform duration-300 hover:bg-accent-purple hover:text-white group-hover:scale-105">University Students Only</span>
            </div>
          </div>
          
          <Formik
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-5">
                {status && (
                  <div className="p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-xl text-sm border border-red-200 shadow-sm">
                    {status}
                  </div>
                )}
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'fullName' ? 'transform scale-[1.02]' : ''}`}>
                    <Field
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Emma Armstrong"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput('fullName')}
                      onBlur={() => setActiveInput(null)}
                    />
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'fullName' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="fullName" component="div" className="mt-1.5 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'email' ? 'transform scale-[1.02]' : ''}`}>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="uni.student@school.edu.gh"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput('email')}
                      onBlur={() => setActiveInput(null)}
                    />
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'email' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-1.5 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'password' ? 'transform scale-[1.02]' : ''}`}>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      className="w-full border border-gray-300 rounded-xl p-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput('password')}
                      onBlur={() => setActiveInput(null)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'password' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-1.5 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'confirmPassword' ? 'transform scale-[1.02]' : ''}`}>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      className="w-full border border-gray-300 rounded-xl p-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput('confirmPassword')}
                      onBlur={() => setActiveInput(null)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'confirmPassword' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1.5 text-sm text-red-600" />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-white bg-secondary hover:bg-dark-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-all duration-300 transform hover:translate-y-[-2px] relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white group-hover:translate-x-0 opacity-10"></span>
                    <span className="relative">
                      {loading ? 'Creating account...' : 'SIGN UP'}
                    </span>
                  </button>
                </div>
                
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500 font-medium">OR CONTINUE WITH</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                    />
                  </svg>
                  <span>SIGN UP WITH GOOGLE</span>
                </button>
                
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-600">
                    Already have an account? {' '}
                    <Link to="/login" className="font-medium text-secondary hover:text-dark-orange transition-colors duration-300">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        
        {/* Universities badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['University of Ghana', 'KNUST', 'UCC', 'GIMPA', 'Ashesi'].map((uni, index) => (
            <span 
              key={uni} 
              className="text-xs bg-white/80 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-full shadow-sm border border-white/50 transition-all duration-300 hover:bg-secondary hover:text-white transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {uni}
            </span>
          ))}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default Register;
