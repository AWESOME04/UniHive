import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, CheckCircle, RefreshCcw } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Get credentials from location state
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
      }
      if (location.state.password) {
        setPassword(location.state.password);
      }
    } else {
      // If no email is provided, redirect to register
      navigate("/register");
    }
  }, [location, navigate]);

  // Start countdown for resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timerInterval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [resendTimer]);

  // Handle OTP input change and autofocus next input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key press to support backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Focus previous input on backspace when current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event to distribute characters to inputs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.replace(/\D/g, "").split("");
    
    if (digits.length) {
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < otp.length) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty input or last input if all filled
      const nextEmptyIndex = newOtp.findIndex(val => val === "");
      if (nextEmptyIndex >= 0 && nextEmptyIndex < otp.length) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[otp.length - 1]?.focus();
      }
    }
  };

  // Handle OTP verification submission
  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setLoading(true);
    
    try {
      await verifyOTP(email, otpString);
      
      // Show success animation
      setVerificationSuccess(true);
      toast.success("Email verified successfully!");
      
      // Delay to show success animation
      setTimeout(() => {
        // Navigate to login with auto-login credentials
        navigate("/login", {
          state: {
            email,
            password,
            autoLogin: true,
          },
        });
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to verify OTP. Please try again.";
      
      toast.error(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      // Focus on first input after error
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Handle resending OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setResendLoading(true);
    
    try {
      // Call API to resend OTP
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }
      
      toast.success("New OTP has been sent to your email");
      setResendTimer(60); // Reset timer
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      <motion.div 
        className="w-full max-w-md relative z-10"
        variants={itemVariants}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          variants={itemVariants}
          whileHover={{ 
            y: -5, 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 } 
          }}
        >
          <div className="text-center">
            {verificationSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                >
                  <CheckCircle size={40} className="text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful!</h2>
                <p className="text-gray-600 mb-4">Redirecting you to dashboard...</p>
                <div className="w-full max-w-sm bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-secondary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="w-16 h-16 rounded-full bg-secondary/10 mx-auto flex items-center justify-center mb-4"
                  variants={itemVariants}
                >
                  <Mail size={30} className="text-secondary" />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-1"
                  variants={itemVariants}
                >
                  Verify your email
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mb-6"
                  variants={itemVariants}
                >
                  We've sent a 6-digit code to <span className="font-medium">{email}</span>
                </motion.p>
              
                <motion.div 
                  className="flex justify-center gap-2 sm:gap-3 mb-6"
                  variants={itemVariants}
                >
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all duration-200"
                      autoFocus={index === 0}
                      whileHover={{ scale: 1.05 }}
                      whileFocus={{ scale: 1.05 }}
                    />
                  ))}
                </motion.div>
              
                <motion.button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.some((digit) => digit === "")}
                  className={`w-full py-3 px-4 bg-secondary text-white rounded-lg font-medium transition-all duration-200 ${
                    loading || otp.some((digit) => digit === "")
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-secondary-dark"
                  }`}
                  variants={itemVariants}
                  whileHover={
                    !loading && !otp.some((digit) => digit === "") 
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    !loading && !otp.some((digit) => digit === "") 
                      ? { scale: 0.98 }
                      : {}
                  }
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
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
                      Verifying...
                    </div>
                  ) : (
                    "Verify Account"
                  )}
                </motion.button>
              
                <motion.div 
                  className="mt-6 text-center"
                  variants={itemVariants}
                >
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the code?
                  </p>
                  <motion.button
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || resendLoading}
                    className={`inline-flex items-center text-secondary font-medium text-sm ${
                      resendTimer > 0 || resendLoading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:text-secondary-dark"
                    }`}
                    whileHover={
                      resendTimer === 0 && !resendLoading
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={
                      resendTimer === 0 && !resendLoading
                        ? { scale: 0.95 }
                        : {}
                    }
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCcw size={16} className="mr-1 animate-spin" />
                        Sending...
                      </>
                    ) : resendTimer > 0 ? (
                      `Resend OTP in ${resendTimer}s`
                    ) : (
                      <>
                        <RefreshCcw size={16} className="mr-1" />
                        Resend OTP
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      <ToastContainer position="bottom-center" />
    </motion.div>
  );
}

export default OTPVerification;
