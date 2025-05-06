import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, GraduationCap, Users, ChevronDown } from 'lucide-react';
import authService from '../services/authService';

// Define university interface
interface University {
  id: string;
  name: string;
  emailDomain: string;
}

// List of Ghanaian universities with their email domains
const universities: University[] = [
  { id: 'uog', name: 'University of Ghana', emailDomain: 'st.ug.edu.gh' },
  { id: 'knust', name: 'Kwame Nkrumah University', emailDomain: 'st.knust.edu.gh' },
  { id: 'ucc', name: 'University of Cape Coast', emailDomain: 'stu.ucc.edu.gh' },
  { id: 'gimpa', name: 'Ghana Institute of Management', emailDomain: 'student.gimpa.edu.gh' },
  { id: 'central', name: 'Central University', emailDomain: 'central.edu.gh' },
  { id: 'ashesi', name: 'Ashesi University', emailDomain: 'ashesi.edu.gh' },
  { id: 'uew', name: 'University of Education, Winneba', emailDomain: 'stu.uew.edu.gh' },
  { id: 'uds', name: 'University for Development Studies', emailDomain: 'uds.edu.gh' },
  { id: 'upsa', name: 'University of Professional Studies', emailDomain: 'st.upsa.edu.gh' },
  { id: 'atu', name: 'Accra Technical University', emailDomain: 'atu.edu.gh' },
];

const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  university: Yup.string()
    .required('Please select your university'),
  emailUsername: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z0-9._%+-]+$/, 'Invalid email username format'),
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
  university: string;
  emailUsername: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

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

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>, setFieldValue: any) => {
    const universityId = e.target.value;
    const university = universities.find(u => u.id === universityId) || null;
    setSelectedUniversity(university);
    setFieldValue('university', universityId);
  };

  const handleSubmit = async (
    values: RegisterFormValues, 
    { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    setLoading(true);
    setStatus(null);
    
    try {
      // Construct the full email
      const university = universities.find(u => u.id === values.university);
      if (!university) {
        throw new Error('Invalid university selection');
      }
      
      const email = `${values.emailUsername}@${university.emailDomain}`;
      
      // Call the server API to register the user
      const response = await authService.register({
        name: values.fullName,
        email,
        password: values.password,
        university: university.name
      });
      
      toast.success(response.message || 'Registration initiated! Please verify your email.');
      
      // Navigate to OTP verification with email
      navigate('/otp-verification', { 
        state: { 
          email,
          fullName: values.fullName,
          password: values.password
        } 
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setStatus(errorMessage);
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
            <h2 className="text-4xl font-bold text-primary mb-2">Register</h2>
            <p className="mt-2 text-gray-600">Join your class now, discover new opportunities, and start your journey today!</p>
            <div className="mt-4 flex justify-center">
              <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md transform transition-transform duration-300 hover:bg-accent-purple hover:text-white group-hover:scale-105">University Students Only</span>
            </div>
          </div>
          
          <Formik
            initialValues={{ 
              fullName: '', 
              university: '', 
              emailUsername: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status, setFieldValue }) => (
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

                {/* University Selection */}
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your University
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'university' ? 'transform scale-[1.02]' : ''}`}>
                    <div className="relative">
                      <Field
                        as="select"
                        id="university"
                        name="university"
                        className="w-full appearance-none border border-gray-300 rounded-xl p-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        onFocus={() => setActiveInput('university')}
                        onBlur={() => setActiveInput(null)}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleUniversityChange(e, setFieldValue)}
                      >
                        <option value="">Select your university</option>
                        {universities.map(university => (
                          <option key={university.id} value={university.id}>
                            {university.name}
                          </option>
                        ))}
                      </Field>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown size={18} className="text-gray-500" />
                      </div>
                    </div>
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'university' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="university" component="div" className="mt-1.5 text-sm text-red-600" />
                </div>

                {/* Email Username with Domain */}
                <div>
                  <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Student Email
                  </label>
                  <div className={`relative transition-all duration-300 ${activeInput === 'emailUsername' ? 'transform scale-[1.02]' : ''}`}>
                    <div className="flex rounded-xl overflow-hidden">
                      <Field
                        id="emailUsername"
                        name="emailUsername"
                        type="text"
                        placeholder="your.username"
                        className="w-full border border-gray-300 rounded-l-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        onFocus={() => setActiveInput('emailUsername')}
                        onBlur={() => setActiveInput(null)}
                      />
                      <div className="bg-gray-100 border-y border-r border-gray-300 rounded-r-xl px-3 flex items-center text-gray-600 whitespace-nowrap">
                        @{selectedUniversity ? selectedUniversity.emailDomain : 'university.edu.gh'}
                      </div>
                    </div>
                    <div className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${activeInput === 'emailUsername' ? 'opacity-5' : ''}`}></div>
                  </div>
                  <ErrorMessage name="emailUsername" component="div" className="mt-1.5 text-sm text-red-600" />
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

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`w-full py-3.5 px-4 rounded-xl text-white font-medium transition-all duration-300 ${
                      isSubmitting || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-secondary hover:bg-dark-orange transform hover:translate-y-[-2px]'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Register'}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-secondary hover:text-dark-orange transition-colors duration-300">
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
