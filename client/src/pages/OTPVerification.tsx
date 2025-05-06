import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, GraduationCap, BookOpen } from 'lucide-react';
import authService from '../services/authService';

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    if (!email) {
      // If no email is provided, redirect to registration
      navigate('/register');
      toast.error('Please complete registration first');
    }
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add cursor effect listener
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.head.removeChild(link);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setCountdown(60);
    
    try {
      // Call server API to resend OTP
      const response = await authService.resendOTP(email);
      toast.info(response.message || 'New OTP sent to your email');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      toast.error(errorMessage);
    }
    
    // Restart countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call server API to verify OTP
      const response = await authService.verifyOTP({
        email,
        otp: otpValue
      });
      
      setVerificationComplete(true);
      
      // Wait for animation to complete before redirecting
      setTimeout(() => {
        toast.success(response.message || 'Email verified successfully!');
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 4) return email;
    
    const visiblePart = username.slice(0, 3);
    const hiddenPart = '*'.repeat(username.length - 3);
    
    return `${visiblePart}${hiddenPart}@${domain}`;
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
        <BookOpen size={100} />
      </div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo and branding */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl rotate-6 animate-float">
            UH
          </div>
        </div>
        
        {/* Card with morphism effect */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]">
          {/* Background patterns */}
          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5"></div>
          
          {verificationComplete ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-up">
                <CheckCircle size={50} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Verification Complete!</h2>
              <p className="text-gray-600 text-center mb-4">Your email has been verified successfully.</p>
              <p className="text-gray-600 text-center">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6 relative">
                <h2 className="text-3xl font-bold text-primary mb-2">Verify Your Email</h2>
                <p className="mt-2 text-gray-600">
                  We've sent a verification code to<br />
                  <span className="font-medium text-secondary">{formatEmail(email)}</span>
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between space-x-2 mb-4">
                  {otp.map((digit, index) => (
                    <div key={index} className="w-full">
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-full aspect-square text-center text-2xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        autoFocus={index === 0}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className={`font-medium ${
                      resendDisabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-secondary hover:text-dark-orange transition-colors duration-300'
                    }`}
                  >
                    {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={loading || otp.some(digit => !digit)}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-medium transition-all duration-300 ${
                    loading || otp.some(digit => !digit)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-secondary hover:bg-dark-orange transform hover:translate-y-[-2px]'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
