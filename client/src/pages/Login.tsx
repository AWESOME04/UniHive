import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, GraduationCap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

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
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5
      }
    })
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
        handleSubmit({
          email: state.email,
          password: state.password,
          rememberMe: false
        }, {
          setSubmitting: () => {},
          setStatus: () => {}
        });
      }, 500);
    }

    return () => {
      document.head.removeChild(link);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location]);

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
    setLoading(true);
    setStatus(null);
    
    try {
      
      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      
      toast.error(errorMessage);
      setStatus(errorMessage);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Cursor light effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-70 hidden md:block"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 69, 0, 0.15), transparent 80%)`,
        }}
      />

      {/* Background elements */}
      <motion.div 
        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute top-20 sm:top-40 right-10 sm:right-20 w-36 sm:w-72 h-36 sm:h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-40 sm:w-80 h-40 sm:h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          scale: [1, 1.05, 1],
          x: [0, 5, 0],
          y: [0, -5, 0],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 text-secondary opacity-10 hidden sm:block"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <GraduationCap size={120} />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-10 text-accent-purple opacity-10 hidden sm:block"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      >
        <BookOpen size={100} />
      </motion.div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
      >
        {/* Logo and branding */}
        <motion.div 
          className="absolute -top-14 sm:-top-20 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <motion.img 
            src="/unihive-no-text.svg" 
            alt="UniHive Logo" 
            className="h-16 w-16 sm:h-20 sm:w-20 shadow-lg"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              y: [0, -5, 0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Card with morphism effect */}
        <motion.div 
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100,
            delay: 0.3,
            duration: 0.6
          }}
          whileHover={{ 
            y: -5, 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Background patterns */}
          <motion.div
            className="absolute -right-16 -top-16 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-secondary opacity-5"
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, -5, 0], 
              y: [0, 5, 0] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div
            className="absolute -left-16 -bottom-16 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-accent-purple opacity-5"
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, 5, 0], 
              y: [0, -5, 0] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />

          <motion.div 
            className="text-center mb-5 sm:mb-8 relative"
            variants={formItemVariants}
            custom={0}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
              Welcome Back
            </h2>
            <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-base">
              Ready to learn, teach and make a difference today?
            </p>
            <motion.div 
              className="mt-2 sm:mt-4 flex justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span 
                className="bg-secondary text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ghanaian University Students Only
              </motion.span>
            </motion.div>
          </motion.div>

          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-3 sm:space-y-6">
                {status && (
                  <motion.div 
                    className="p-2 sm:p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-xl text-xs sm:text-sm border border-red-200 shadow-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {status}
                  </motion.div>
                )}

                <motion.div variants={formItemVariants} custom={1}>
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
                    <motion.div
                      className={`absolute inset-0 -z-10 bg-secondary rounded-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeInput === "email" ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </motion.div>

                <motion.div variants={formItemVariants} custom={2}>
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
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-400 hover:text-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <EyeOff size={16} className="sm:w-5 sm:h-5" />
                      ) : (
                        <Eye size={16} className="sm:w-5 sm:h-5" />
                      )}
                    </motion.button>
                    <motion.div
                      className={`absolute inset-0 -z-10 bg-secondary rounded-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeInput === "password" ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-xs text-red-600"
                  />
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between"
                  variants={formItemVariants} 
                  custom={3}
                >
                  <div className="flex items-center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary focus:ring-secondary rounded"
                      />
                    </motion.div>
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-xs sm:text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <motion.div 
                    className="text-xs sm:text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to="/forgot-password"
                      className="text-secondary hover:text-secondary-dark"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div variants={formItemVariants} custom={4}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`w-full flex justify-center items-center py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 ${
                      (isSubmitting || loading) &&
                      "opacity-70 cursor-not-allowed"
                    }`}
                    whileHover={!(isSubmitting || loading) ? { scale: 1.03 } : {}}
                    whileTap={!(isSubmitting || loading) ? { scale: 0.97 } : {}}
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
                  </motion.button>
                </motion.div>
              </Form>
            )}
          </Formik>

          <motion.div 
            className="mt-4 sm:mt-6 text-center"
            variants={formItemVariants}
            custom={5}
          >
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                <Link
                  to="/register"
                  className="text-secondary hover:text-secondary-dark font-medium"
                >
                  Sign up here
                </Link>
              </motion.span>
            </p>
            
            <motion.p 
              className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              By logging in, you agree to UniHive's{" "}
              <Link to="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      <ToastContainer position="bottom-center" />
    </motion.div>
  );
}

export default Login;
