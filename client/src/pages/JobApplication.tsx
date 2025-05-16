import { useState } from 'react';
import { ArrowLeft, Check, Upload } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function JobApplication() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'information' | 'successful'>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'coverLetter') => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === 'resume') {
        setResumeFile(e.target.files[0]);
      } else {
        setCoverLetterFile(e.target.files[0]);
      }
    }
  };
  
  const handleNext = () => {
    if (step === 'upload') {
      setStep('information');
    } else if (step === 'information') {
      setStep('successful');
    }
  };
  
  const handleFindJob = () => {
    navigate('/search');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to={`/job/${id}`} className="flex items-center text-indigo-600 font-medium">
          <ArrowLeft size={18} className="mr-2" />
          Back to Job Details
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Apply for Python Tutor</h1>
            <p className="text-gray-600">Logan Campus</p>
          </div>

          {/* Content */}
          {step === 'upload' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload CV</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV (Required)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {resumeFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-2 rounded-md mr-3">
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-800">{resumeFile.name}</p>
                            <p className="text-xs text-gray-500">{Math.round(resumeFile.size / 1024)} KB</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="resume"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'resume')}
                        />
                        <label
                          htmlFor="resume"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <Upload size={40} className="text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Letter (Optional)
                    </label>
                    <span className="text-xs text-gray-500">Optional</span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {coverLetterFile ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-md mr-3">
                            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-800">{coverLetterFile.name}</p>
                            <p className="text-xs text-gray-500">{Math.round(coverLetterFile.size / 1024)} KB</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setCoverLetterFile(null)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="coverLetter"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'coverLetter')}
                        />
                        <label
                          htmlFor="coverLetter"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <Upload size={40} className="text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!resumeFile}
                  className={`w-full py-3 rounded-lg font-medium ${
                    resumeFile
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {step === 'information' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why are you interested in this position?
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="Tell us why you're interested and what makes you a good fit..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span>
                  </label>
                </div>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  SUBMIT APPLICATION
                </button>
              </form>
            </div>
          )}

          {step === 'successful' && (
            <div className="p-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <Check size={40} className="text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Successful</h2>
              <p className="text-gray-600 mb-8">
                Your application has been submitted successfully
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-700">
                  We will review your application and get back to you within 5-7 business days. You can check the status of your application in your profile.
                </p>
              </div>
              <button
                onClick={handleFindJob}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                FIND A SIMILAR JOB
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors mt-4"
              >
                BACK TO HOME
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobApplication;
