import { useState } from 'react';
import { MoreVertical, Send, Share2, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import JobCard from '../components/jobs/JobCard';

// Mock job data that matches the JobCard component props structure
const mockSavedJobs = [
  {
    id: '1',
    title: 'UX/UI Designer',
    company: 'University of Ghana',
    location: 'Legon campus',
    type: 'Part-time',
    salary: 'GH₵1.5K/hr',
    postedAt: '20 mins ago',
    tags: ['Design', 'part-time', 'designer'],
  },
  {
    id: '2',
    title: 'Graphic Designer',
    company: 'University of Ghana',
    location: 'Legon campus',
    type: 'Full-time',
    salary: 'GH₵2K/hr',
    postedAt: '30 mins ago',
    tags: ['Design', 'full-time', 'designer'],
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'University of Ghana',
    location: 'Legon campus',
    type: 'Part-time',
    salary: 'GH₵1.5K/hr',
    postedAt: '45 mins ago',
    tags: ['Design', 'part-time', 'designer'],
  }
];

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [selectedJob, setSelectedJob] = useState<typeof mockSavedJobs[0] | null>(null);
  const [optionsOpen, setOptionsOpen] = useState<string | null>(null);

  const handleDeleteJob = (id: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
    setOptionsOpen(null);
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob(null);
    }
  };

  const handleJobOptions = (job: typeof mockSavedJobs[0]) => {
    setSelectedJob(job);
    setOptionsOpen(job.id === optionsOpen ? null : job.id);
  };

  const handleApply = () => {
    // Handle apply logic
    setOptionsOpen(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Save Job Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Saved Jobs</h2>
              <button 
                onClick={() => setSavedJobs([])}
                className="text-xs text-blue-600 font-medium"
              >
                Delete all
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              {savedJobs.length > 0 ? (
                <div className="p-4 space-y-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="relative">
                      <JobCard job={job} isSaved={true} />
                      <button 
                        onClick={() => handleJobOptions(job)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" fill="#E6E6FF" />
                        <path d="M36 28H28V36H36V28Z" fill="#4F46E5" />
                        <path d="M44 20H20V44H44V20Z" stroke="#4F46E5" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">No Saved Jobs</h3>
                  <p className="text-sm text-gray-500 mb-4">You don't have any job saved, please find it in search to save jobs</p>
                  <Link 
                    to="/search" 
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    FIND A JOB
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Options Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Saved Jobs</h2>
            </div>
            
            {selectedJob ? (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-xs font-bold">{selectedJob.company.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{selectedJob.title}</h3>
                    <p className="text-xs text-gray-500">{selectedJob.company}, {selectedJob.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedJob.tags && selectedJob.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <button className="flex items-center w-full text-sm text-gray-700 hover:text-indigo-600 py-2">
                    <Send size={18} className="mr-2" />
                    Send message
                  </button>
                  <button className="flex items-center w-full text-sm text-gray-700 hover:text-indigo-600 py-2">
                    <Share2 size={18} className="mr-2" />
                    Shared
                  </button>
                  <button 
                    onClick={() => handleDeleteJob(selectedJob.id)}
                    className="flex items-center w-full text-sm text-gray-700 hover:text-red-600 py-2"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </button>
                </div>
                
                <Link 
                  to={`/job/${selectedJob.id}/apply`}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                >
                  <Check size={18} className="mr-2" />
                  Apply
                </Link>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Select a job to see options
              </div>
            )}
          </div>

          {/* No Savings Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">No Savings</h2>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 105C84.8528 105 105 84.8528 105 60C105 35.1472 84.8528 15 60 15C35.1472 15 15 35.1472 15 60C15 84.8528 35.1472 105 60 105Z" fill="#E6E6FF" />
                  <path d="M75 45H45V75H75V45Z" fill="#4F46E5" opacity="0.2" />
                  <path d="M82.5 37.5H37.5V82.5H82.5V37.5Z" stroke="#4F46E5" strokeWidth="3" />
                  <path d="M60 45V75" stroke="#4F46E5" strokeWidth="3" />
                  <path d="M45 60H75" stroke="#4F46E5" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">No Saved Jobs</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                You don't have any job saved, please find it in search to save jobs
              </p>
              <Link 
                to="/search" 
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
              >
                FIND A JOB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SavedJobs;
