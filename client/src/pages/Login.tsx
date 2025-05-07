import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store";
import { setCredentials } from "../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, GraduationCap, BookOpen } from "lucide-react";
import authService from "../services/authService";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.[a-zA-Z]{2,}$/,
      "Must be a valid university email (e.g., example@university.edu.gh)"
    )
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  rememberMe: Yup.boolean(),
});

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Separate login handler function for auto-login functionality
  const handleLogin = async (values: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true);
    console.log('Login attempt for:', values.email);
    
    try {
      // Call server API to login
      const response = await authService.login({
        email: values.email,
        password: values.password,
      });

      console.log('Login API response:', response);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server: missing token');
      }

      // Get user data from response
      const userData = response.user || {
        id: response.userId,
        username: values.email.split("@")[0],
        email: values.email,
      };

      console.log('User data extracted:', userData);

      // Update Redux state with user data
      dispatch(
        setCredentials({
          user: userData,
          token: response.token,
        })
      );

      toast.success(response.message || "Login successful!");
      navigate("/");
    } catch (err) {
      console.error('Login error:', err);
      
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add cursor effect listener
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Check for auto-login credentials from OTP verification
    const { state } = location;
    if (state && state.autoLogin && state.email && state.password) {
      console.log('Auto-login triggered after OTP verification');
      
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        // Auto-login after OTP verification
        handleLogin({
          email: state.email,
          password: state.password,
          rememberMe: false
        });
      }, 500);
    }

    return () => {
      document.head.removeChild(link);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async (
    values: { email: string; password: string; rememberMe: boolean },
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status: string | null) => void;
    }
  ) => {
    setStatus(null);
    
    try {
      // Use the handleLogin function for consistent behavior
      await handleLogin(values);
    } catch (err) {
      // Error handling is already done in handleLogin
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setStatus(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cursor light effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-70 hidden md:block"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 69, 0, 0.15), transparent 80%)`,
        }}
      />

      {/* Background elements */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-36 sm:w-72 h-36 sm:h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-40 sm:w-80 h-40 sm:h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-secondary opacity-10 hidden sm:block">
        <GraduationCap size={120} />
      </div>
      <div className="absolute bottom-10 left-10 text-accent-purple opacity-10 hidden sm:block">
        <BookOpen size={100} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="absolute -top-14 sm:-top-20 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <img 
            src="/unihive-no-text.svg" 
            alt="UniHive Logo" 
            className="h-16 w-16 sm:h-20 sm:w-20 shadow-lg rotate-12 animate-float"
          />
        </div>

        {/* Card with morphism effect */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/20 relative overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]">
          {/* Background patterns */}
          <div className="absolute -right-16 -top-16 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-secondary opacity-5"></div>
          <div className="absolute -left-16 -bottom-16 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-accent-purple opacity-5"></div>

          <div className="text-center mb-5 sm:mb-8 relative">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
              Welcome Back
            </h2>
            <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-base">
              Ready to learn, teach and make a difference today?
            </p>
            <div className="mt-2 sm:mt-4 flex justify-center">
              <span className="bg-secondary text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md transform transition-transform duration-300 hover:scale-105">
                Ghanaian University Students Only
              </span>
            </div>
          </div>

          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-3 sm:space-y-6">
                {status && (
                  <div className="p-2 sm:p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-xl text-xs sm:text-sm border border-red-200 shadow-sm">
                    {status}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
                  >
                    Email
                  </label>
                  <div
                    className={`relative transition-all duration-300 ${
                      activeInput === "email" ? "transform scale-[1.02]" : ""
                    }`}
                  >
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="uni.student@school.edu.gh"
                      className="w-full border border-gray-300 rounded-xl p-2.5 sm:p-3.5 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput("email")}
                      onBlur={() => setActiveInput(null)}
                    />
                    <div
                      className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${
                        activeInput === "email" ? "opacity-5" : ""
                      }`}
                    ></div>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
                  >
                    Password
                  </label>
                  <div
                    className={`relative transition-all duration-300 ${
                      activeInput === "password" ? "transform scale-[1.02]" : ""
                    }`}
                  >
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Your secure password"
                      className="w-full border border-gray-300 rounded-xl p-2.5 sm:p-3.5 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      onFocus={() => setActiveInput("password")}
                      onBlur={() => setActiveInput(null)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff size={16} className="sm:w-5 sm:h-5" />
                      ) : (
                        <Eye size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </button>
                    <div
                      className={`absolute inset-0 -z-10 bg-secondary opacity-0 rounded-xl transition-opacity duration-300 ${
                        activeInput === "password" ? "opacity-5" : ""
                      }`}
                    ></div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary focus:ring-secondary rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-xs sm:text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-secondary hover:text-secondary-dark"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`w-full flex justify-center items-center py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 ${
                      (isSubmitting || loading) &&
                      "opacity-70 cursor-not-allowed"
                    }`}
                  >
                    {(isSubmitting || loading) ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-secondary hover:text-secondary-dark font-medium"
              >
                Sign up here
              </Link>
            </p>
            
            <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500">
              By logging in, you agree to UniHive's{" "}
              <Link to="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default Login;
