import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Check, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Ghana University data with domains
const universities = [
  { id: 1, name: 'University of Ghana', domain: 'ug.edu.gh' },
  { id: 2, name: 'Kwame Nkrumah University of Science and Technology', domain: 'knust.edu.gh' },
  { id: 3, name: 'University of Cape Coast', domain: 'ucc.edu.gh' },
  { id: 4, name: 'Ghana Institute of Management and Public Administration', domain: 'gimpa.edu.gh' },
  { id: 5, name: 'University of Education, Winneba', domain: 'uew.edu.gh' },
  { id: 6, name: 'University of Professional Studies, Accra', domain: 'upsa.edu.gh' },
  { id: 7, name: 'Ghana Communication Technology University', domain: 'gctu.edu.gh' },
  { id: 8, name: 'University of Health and Allied Sciences', domain: 'uhas.edu.gh' },
  { id: 9, name: 'University of Energy and Natural Resources', domain: 'uenr.edu.gh' },
  { id: 10, name: 'University of Development Studies', domain: 'uds.edu.gh' },
];

function Authentication() {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<'landing' | 'login' | 'register' | 'otp' | 'success'>('landing');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<typeof universities[0] | null>(null);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  
  // Update email when university or email prefix changes
  useEffect(() => {
    if (selectedUniversity && emailPrefix) {
      setEmail(`${emailPrefix}@${selectedUniversity.domain}`);
    } else {
      setEmail('');
    }
  }, [selectedUniversity, emailPrefix]);

  // Check if OTP is complete
  useEffect(() => {
    const complete = otpValues.every(value => value !== '');
    setIsOtpComplete(complete);
  }, [otpValues]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic
    console.log('Login with:', { email, password });
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement signup logic
    console.log('Register with:', { fullName, email, password });
    // Move to OTP verification screen
    setActiveScreen('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto-focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpVerification = () => {
    // Implement OTP verification logic
    console.log('OTP Verification:', otpValues.join(''));
    // Move to success screen
    setActiveScreen('success');
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const newOtpValues = [...otpValues];
      
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtpValues[i] = pastedData.charAt(i);
        }
      }
      
      setOtpValues(newOtpValues);
    }
  };

  const renderLandingScreen = () => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src="/logo.svg" alt="UniHive Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-2">UniHive</h1>
            <p className="text-gray-600">Find the best jobs at Ghana University</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => setActiveScreen('login')}
                className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-dark-blue transition-colors"
              >
                LOGIN
              </button>
              
              <button 
                onClick={() => setActiveScreen('register')}
                className="w-full bg-white border border-gray-300 text-primary py-3 rounded-lg font-medium hover:border-secondary hover:text-secondary transition-colors"
              >
                REGISTER
              </button>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-secondary">Terms of Service</a> and{' '}
            <a href="#" className="text-secondary">Privacy Policy</a>
          </p>
        </div>
      </div>
      
      <div className="bg-secondary text-white py-4 px-6 text-center">
        <p className="text-sm"> 2025 UniHive. All rights reserved.</p>
      </div>
    </div>
  );

  const renderLoginScreen = () => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="UniHive Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-600">Log in to access your account</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="University Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="text-right">
                <button 
                  type="button"
                  className="text-sm text-secondary font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-dark-blue transition-colors"
              >
                LOGIN
              </button>
            </form>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => setActiveScreen('register')}
                className="text-secondary font-medium"
              >
                Register
              </button>
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setActiveScreen('landing')}
              className="text-sm text-gray-600 hover:text-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegisterScreen = () => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="UniHive Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-1">Create an Account</h1>
            <p className="text-sm text-gray-600">Join UniHive to find the best jobs at Ghana University</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-left flex justify-between items-center"
                >
                  <span className={selectedUniversity ? 'text-gray-900' : 'text-gray-400'}>
                    {selectedUniversity ? selectedUniversity.name : 'Select University'}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>
                <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                
                {showUniversityDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {universities.map((university) => (
                      <button
                        key={university.id}
                        type="button"
                        onClick={() => {
                          setSelectedUniversity(university);
                          setShowUniversityDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-light-blue hover:text-secondary"
                      >
                        {university.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="flex">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Email prefix"
                      value={emailPrefix}
                      onChange={(e) => setEmailPrefix(e.target.value)}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                      disabled={!selectedUniversity}
                    />
                    <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 flex items-center text-gray-600 text-sm">
                    {selectedUniversity ? `@${selectedUniversity.domain}` : '@university.edu'}
                  </div>
                </div>
                {email && (
                  <p className="text-xs text-gray-500 mt-1 ml-2">
                    Your email will be: {email}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the <a href="#" className="text-secondary">Terms of Service</a> and <a href="#" className="text-secondary">Privacy Policy</a>
                </label>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-dark-blue transition-colors"
                disabled={!selectedUniversity || !emailPrefix || !password || password !== confirmPassword}
              >
                REGISTER
              </button>
            </form>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setActiveScreen('login')}
                className="text-secondary font-medium"
              >
                Login
              </button>
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setActiveScreen('landing')}
              className="text-sm text-gray-600 hover:text-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtpScreen = () => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="UniHive Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-1">Verify Your Email</h1>
            <p className="text-sm text-gray-600">
              We've sent a verification code to<br />
              <span className="font-medium">{email}</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Enter the 6-digit code sent to your email
              </p>
              
              <div className="flex justify-center space-x-2" onPaste={handleOtpPaste}>
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleOtpVerification}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isOtpComplete 
                  ? 'bg-secondary text-white hover:bg-dark-blue' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isOtpComplete}
            >
              VERIFY
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-secondary font-medium">
                  Resend
                </button>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setActiveScreen('register')}
              className="text-sm text-gray-600 hover:text-secondary"
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="UniHive Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-1">Registration Successful!</h1>
            <p className="text-sm text-gray-600">Your account has been created successfully</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-light-green rounded-full flex items-center justify-center">
                <Check size={40} className="text-accent-green" />
              </div>
            </div>
            
            <p className="text-center text-gray-600 mb-6">
              You can now access all features of UniHive and find the best jobs at Ghana University.
            </p>
            
            <Link 
              to="/dashboard"
              className="block w-full bg-secondary text-white py-3 rounded-lg font-medium text-center hover:bg-dark-blue transition-colors"
            >
              GO TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate screen based on the activeScreen state
  switch (activeScreen) {
    case 'landing':
      return renderLandingScreen();
    case 'login':
      return renderLoginScreen();
    case 'register':
      return renderRegisterScreen();
    case 'otp':
      return renderOtpScreen();
    case 'success':
      return renderSuccessScreen();
    default:
      return renderLandingScreen();
  }
}

export default Authentication;
