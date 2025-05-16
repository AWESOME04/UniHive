import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, MapPin, Clock, Briefcase, DollarSign, Share2, Bookmark, Send, 
  Calendar, Building, CreditCard, Star, ChevronRight, CheckCircle, X
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Mock job data - in a real app, this would come from an API
const mockJobs = [
  {
    id: '1',
    title: 'Python Tutor',
    company: 'Ghana University - Legon Campus',
    location: 'Accra, Ghana',
    type: 'Part-time',
    salary: 'GH₵50/hr',
    postedAt: '1 day ago',
    description: `Looking for a python tutor to help undergraduate students learn the basics of Python programming. The ideal candidate should have strong knowledge of Python fundamentals, data structures, and algorithms.

The tutor will be responsible for conducting weekly sessions, reviewing code assignments, and providing feedback to students. This is a great opportunity to share your knowledge while earning in Ghanaian cedis.`,
    requirements: [
      'Strong knowledge of Python programming',
      'At least 2 years of coding experience',
      'Excellent communication skills',
      'Available for at least 10 hours per week',
      'Experience in teaching or mentoring is a plus',
      'Currently enrolled or graduated from a Computer Science or related program at Ghana University'
    ],
    location_details: 'Ghana University - Legon Campus, Accra, Ghana',
    information: {
      position: 'Tutor',
      department: 'Computer Science',
      qualification: 'BSc CS or equivalent (3rd year+)',
      experience: '2+ years Python coding',
      specialization: 'Python, Data Structures, Algorithms',
      payment: 'GH₵50 per hour'
    },
    deadlines: [
      'Apply by: 30 May 2025',
      'Interview Notification: 5 June 2025',
      'Start Date: 15 June 2025'
    ],
    skills: ['Python', 'Teaching', 'Data Structures', 'Algorithms', 'Communication'],
    applicants: 12,
    views: 145,
    rating: 4.8,
    reviews: 5,
    employer: {
      name: 'Dr. Kwame Nkrumah',
      title: 'Department Head, Computer Science',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      response_rate: '95%',
      response_time: 'Usually within 24 hours'
    }
  }
];

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [isApplying, setIsApplying] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'company' | 'reviews'>('description');
  const [showContactEmployer, setShowContactEmployer] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Find the job by ID (in a real app, this would be fetched from an API)
  const job = mockJobs.find(job => job.id === id) || mockJobs[0];
  
  useEffect(() => {
    // Add cursor effect listener
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    if (showContactEmployer) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showContactEmployer, message]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'coverLetter') => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === 'resume') {
        setResumeFile(e.target.files[0]);
      } else {
        setCoverLetterFile(e.target.files[0]);
      }
    }
  };
  
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the application to an API
    alert('Application submitted successfully!');
    setIsApplying(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send the message to an API
      alert('Message sent successfully!');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cursor light effect */}
      <div 
        className="pointer-events-none absolute -inset-40 opacity-20 bg-gradient-radial from-primary to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: '80vw',
          height: '80vw',
          transition: 'left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      ></div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-light-orange opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-6">
          <Link to="/search" className="inline-flex items-center text-secondary font-medium hover:text-primary transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Job Header Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative h-40 bg-gradient-to-r from-light-orange to-secondary opacity-10"></div>
              <div className="p-6 -mt-16">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-white">
                    <Building size={32} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-primary">{job.title}</h1>
                        <div className="flex items-center mt-1 text-gray-600">
                          <Building size={16} className="mr-2 text-secondary" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin size={16} className="mr-2 text-secondary" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className={`p-2 rounded-full ${isBookmarked ? 'bg-light-orange/20 text-secondary' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark size={20} className={isBookmarked ? 'fill-secondary' : ''} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-light-orange/20 text-secondary rounded-full text-sm">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {job.salary}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                        <Clock size={14} className="mr-1" /> Posted {job.postedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Stats Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="grid grid-cols-3 divide-x">
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{job.applicants}</div>
                  <div className="text-sm text-gray-500">Applicants</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{job.views}</div>
                  <div className="text-sm text-gray-500">Views</div>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary mr-1">{job.rating}</span>
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-sm text-gray-500">{job.reviews} Reviews</div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl-soft overflow-hidden border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px]">
              {/* Job Header */}
              <div className="p-8 border-b border-gray-100 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5"></div>
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between relative z-10">
                  <div>
                    <h1 className="text-3xl font-bold mb-3 text-primary">{job.title}</h1>
                    <div className="flex flex-wrap items-center text-gray-600 mb-5 gap-y-2">
                      <span className="flex items-center mr-4">
                        <Building size={16} className="mr-1 text-secondary" /> {job.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1 text-secondary" /> {job.location}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-light-orange/30 text-secondary px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm">
                        <Clock size={14} className="mr-1.5" /> {job.type}
                      </span>
                      <span className="bg-light-green/30 text-accent-green px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm">
                        <DollarSign size={14} className="mr-1.5" /> {job.salary}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm">
                        <Calendar size={14} className="mr-1.5" /> Posted {job.postedAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <button className="p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-300 relative group">
                      <Share2 size={20} className="text-gray-600 group-hover:text-secondary transition-colors duration-300" />
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Share job</span>
                    </button>
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-300 relative group"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark 
                        size={20} 
                        className={`${isBookmarked ? 'text-secondary fill-secondary' : 'text-gray-600 group-hover:text-secondary'} transition-colors duration-300`} 
                      />
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {isBookmarked ? 'Saved' : 'Save job'}
                      </span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-300 relative group">
                      <Send size={20} className="text-gray-600 group-hover:text-secondary transition-colors duration-300" />
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Send via email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                      activeTab === 'description' 
                        ? 'text-secondary border-b-2 border-secondary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Job Description
                  </button>
                  <button
                    onClick={() => setActiveTab('company')}
                    className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                      activeTab === 'company' 
                        ? 'text-secondary border-b-2 border-secondary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Company
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                      activeTab === 'reviews' 
                        ? 'text-secondary border-b-2 border-secondary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                <div className="p-6">
                  {/* Description Tab Content */}
                  {activeTab === 'description' && (
                    <div>
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 text-primary">About This Role</h2>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">{job.description}</p>
                        
                        <h3 className="text-md font-semibold mb-3 text-primary">Requirements</h3>
                        <ul className="space-y-2 mb-6">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-gray-700 flex items-start">
                              <div className="h-5 w-5 rounded-full bg-light-orange/20 flex items-center justify-center text-secondary mr-3 mt-0.5 flex-shrink-0">
                                <CheckCircle size={12} />
                              </div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-md font-semibold mb-3 text-primary">Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-md font-semibold mb-3 text-primary">Important Dates</h3>
                        <div className="space-y-2 mb-6">
                          {job.deadlines.map((deadline, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-light-orange/20 flex items-center justify-center text-secondary mr-3 flex-shrink-0">
                                <Calendar size={12} />
                              </div>
                              <span className="text-gray-700">{deadline}</span>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-md font-semibold mb-3 text-primary">Job Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(job.information).map(([key, value]) => (
                            <div key={key} className="flex p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-500 w-32 capitalize">{key}:</span>
                              <span className="text-gray-800 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Company Tab Content */}
                  {activeTab === 'company' && (
                    <div>
                      <div className="flex items-start mb-6">
                        <img 
                          src={job.employer.avatar} 
                          alt={job.employer.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-primary">{job.employer.name}</h2>
                          <p className="text-gray-600">{job.employer.title}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <div className="mr-4">
                              <span className="font-medium text-secondary">{job.employer.response_rate}</span> Response Rate
                            </div>
                            <div>
                              <span className="font-medium text-secondary">{job.employer.response_time}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-md font-semibold mb-3 text-primary">About Ghana University</h3>
                        <p className="text-gray-700 mb-4">
                          Ghana University is a prestigious institution of higher learning committed to excellence in education, 
                          research, and innovation. The Computer Science department is known for its cutting-edge curriculum and 
                          dedicated faculty members who are experts in their fields.
                        </p>
                        <p className="text-gray-700">
                          The university offers a vibrant campus life with numerous opportunities for students to engage in 
                          extracurricular activities, research projects, and community service. The Legon Campus is located 
                          in a serene environment conducive for learning and academic pursuits.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-md font-semibold mb-3 text-primary">Location</h3>
                        <p className="text-gray-700 mb-4">{job.location_details}</p>
                        
                        {/* Map placeholder */}
                        <div className="bg-gray-100 rounded-xl h-48 mb-6 flex items-center justify-center relative overflow-hidden">
                          <MapPin size={28} className="text-secondary mr-2" />
                          <span className="text-gray-700 font-medium">Ghana University Campus Map</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab Content */}
                  {activeTab === 'reviews' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-lg font-semibold text-primary">Student Reviews</h2>
                          <p className="text-gray-500 text-sm">See what students say about this employer</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={16} 
                                className={star <= Math.floor(job.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold text-primary">{job.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({job.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[
                          { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, date: '2 weeks ago', comment: 'Dr. Nkrumah is an excellent mentor. He provided clear guidance and was always available to answer questions. The Python tutoring position was a great learning experience.' },
                          { name: 'Michael Osei', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', rating: 4, date: '1 month ago', comment: 'Good experience overall. The job description was accurate and payment was always on time. Would recommend working with this department.' }
                        ].map((review, index) => (
                          <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <img 
                                  src={review.avatar} 
                                  alt={review.name} 
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                  <h4 className="font-medium text-primary">{review.name}</h4>
                                  <div className="flex items-center mt-1">
                                    <div className="flex mr-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                          key={star} 
                                          size={14} 
                                          className={star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Apply Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="p-6">
                {!isApplying ? (
                  <div>
                    <button 
                      onClick={() => setIsApplying(true)}
                      className="w-full bg-secondary text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all mb-4"
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={() => setShowContactEmployer(true)}
                      className="w-full bg-white text-secondary border border-secondary py-3 px-4 rounded-lg font-medium hover:bg-light-orange/10 transition-all"
                    >
                      Contact Employer
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold mb-5 text-primary">Apply for this Job</h2>
                    <form onSubmit={handleApply} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resume/CV (Required)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-secondary transition-colors">
                          {resumeFile ? (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-800">{resumeFile.name}</span>
                              <button 
                                type="button"
                                onClick={() => setResumeFile(null)}
                                className="text-red-500 text-sm hover:text-red-600"
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
                                required
                              />
                              <label
                                htmlFor="resume"
                                className="cursor-pointer text-sm text-gray-600 flex flex-col items-center"
                              >
                                <Briefcase size={24} className="text-secondary mb-2" />
                                Click to upload
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                              </label>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-secondary transition-colors">
                          {coverLetterFile ? (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-800">{coverLetterFile.name}</span>
                              <button 
                                type="button"
                                onClick={() => setCoverLetterFile(null)}
                                className="text-red-500 text-sm hover:text-red-600"
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
                                className="cursor-pointer text-sm text-gray-600 flex flex-col items-center"
                              >
                                <Send size={24} className="text-secondary mb-2" />
                                Click to upload
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                              </label>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsApplying(false)}
                          className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-secondary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Employer Card */}
            {showContactEmployer && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-primary">Contact Employer</h2>
                    <button 
                      onClick={() => setShowContactEmployer(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={job.employer.avatar} 
                      alt={job.employer.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-primary">{job.employer.name}</h3>
                      <p className="text-sm text-gray-500">{job.employer.title}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="bg-light-orange/20 text-secondary p-3 rounded-lg rounded-bl-none max-w-[80%]">
                          <p className="text-sm">Hello! Thank you for your interest in the Python Tutor position. How can I help you?</p>
                          <p className="text-xs text-right mt-1 text-gray-500">10:30 AM</p>
                        </div>
                      </div>
                      <div ref={messagesEndRef}></div>
                    </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className={`p-2 rounded-full ml-2 ${
                        message.trim() ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Similar Jobs Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-primary">Similar Jobs</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Python Developer', location: 'Ghana University - Kumasi Campus', type: 'Full-time', salary: 'GH₵65/hr' },
                    { title: 'Programming Instructor', location: 'Ghana University - Cape Coast Campus', type: 'Part-time', salary: 'GH₵45/hr' },
                    { title: 'Computer Science TA', location: 'Ghana University - Accra Campus', type: 'Part-time', salary: 'GH₵40/hr' }
                  ].map((similarJob, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all hover:border-secondary"
                    >
                      <h3 className="font-medium mb-1 text-primary">{similarJob.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <Building size={14} className="mr-1 text-secondary" />
                        {similarJob.location}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {similarJob.type}
                        </span>
                        <span className="text-secondary font-medium flex items-center">
                          <CreditCard size={14} className="mr-1" />
                          {similarJob.salary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-secondary font-medium py-2 border border-secondary rounded-lg hover:bg-light-orange/10 transition-all flex items-center justify-center">
                  View All Similar Jobs <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
