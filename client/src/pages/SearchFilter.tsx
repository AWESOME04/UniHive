import { useState } from 'react';
import { Search, MapPin, Filter, ChevronDown, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import JobCard from '../components/jobs/JobCard';

interface Specialization {
  id: number;
  name: string;
  icon: string;
  color: string;
}

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'UX/UI Designer',
    company: 'Logan Campus',
    location: 'University of Ghana campus',
    type: 'Part-time',
    salary: 'GH₵1.5K/hr',
    postedAt: '1 day ago',
    tags: ['Design', 'part-time', 'designer'],
  },
  {
    id: '2',
    title: 'Graphic Designer',
    company: 'Logan Campus',
    location: 'University of Ghana campus',
    type: 'Full-time',
    salary: 'GH₵2K/hr',
    postedAt: '2 days ago',
    tags: ['Design', 'full-time', 'designer'],
  },
  {
    id: '3',
    title: 'Python Developer',
    company: 'MIT Campus',
    location: 'Boston, USA',
    type: 'Part-time',
    salary: 'GH₵2.5K/hr',
    postedAt: '3 days ago',
    tags: ['Technical', 'part-time', 'developer'],
  }
];

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs.slice(0, 2)); // Show only first 2 jobs initially
  
  const specializations: Specialization[] = [
    { id: 1, name: 'Technical', icon: '💻', color: 'bg-orange-100' },
    { id: 2, name: 'Finance', icon: '💰', color: 'bg-blue-100' },
    { id: 3, name: 'Design', icon: '🎨', color: 'bg-purple-100' },
    { id: 4, name: 'Marketing', icon: '📊', color: 'bg-green-100' },
    { id: 5, name: 'Engineering', icon: '⚙️', color: 'bg-yellow-100' },
    { id: 6, name: 'Health', icon: '🩺', color: 'bg-red-100' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter jobs based on search query
    const filtered = mockJobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleEnableLocation = () => {
    setLocationEnabled(true);
    // In a real app, you would request location permissions here
  };

  const handleSpecializationSelect = (id: number) => {
    setSelectedSpecialization(id === selectedSpecialization ? null : id);
    
    // Filter jobs based on specialization
    if (id === selectedSpecialization) {
      // If deselecting, show all jobs
      setFilteredJobs(mockJobs.slice(0, 2));
    } else {
      // If selecting, filter by specialization
      const specName = specializations.find(s => s.id === id)?.name;
      const filtered = mockJobs.filter(job => 
        job.tags?.some(tag => tag.toLowerCase() === specName?.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const handleApplyFilter = () => {
    // Implement filter application
    console.log('Applying filters');
    setShowFilterPanel(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Search & Filter</h1>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Search Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Search</h2>
            </div>
            
            {!locationEnabled ? (
              <div className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-medium text-center mb-2">Enable your location</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  It helps us to show the best campus tasks near you
                </p>
                <button 
                  onClick={handleEnableLocation}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium"
                >
                  Use my location
                </button>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  50 km max
                </p>
              </div>
            ) : (
              <div className="p-4">
                <form onSubmit={handleSearch}>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {specializations.map((spec) => (
                      <div 
                        key={spec.id}
                        onClick={() => handleSpecializationSelect(spec.id)}
                        className={`${spec.color} p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                          selectedSpecialization === spec.id ? 'ring-2 ring-indigo-500' : ''
                        }`}
                      >
                        <span className="text-2xl mb-1">{spec.icon}</span>
                        <span className="text-xs font-medium">{spec.name}</span>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Active Search Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Search</h2>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value="UX/UI Designer"
                  className="w-full bg-indigo-100 text-indigo-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-indigo-600" />
              </div>
              
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>

          {/* Specialization Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Specialization</h2>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-100 p-3 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">💻</span>
                  <span className="text-xs font-medium">Technical</span>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">💰</span>
                  <span className="text-xs font-medium">Finance</span>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg flex flex-col items-center justify-center ring-2 ring-indigo-500">
                  <span className="text-2xl mb-1">🎨</span>
                  <span className="text-xs font-medium">Design</span>
                </div>
                <div className="bg-green-100 p-3 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📊</span>
                  <span className="text-xs font-medium">Marketing</span>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">⚙️</span>
                  <span className="text-xs font-medium">Engineering</span>
                </div>
                <div className="bg-red-100 p-3 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">🩺</span>
                  <span className="text-xs font-medium">Health</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Columns */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Filter</h2>
            </div>
            
            <div className="p-4">
              <button 
                onClick={() => setShowFilterPanel(true)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
              >
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Expanded Filter Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Filter</h2>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Category</span>
                  <ChevronDown size={16} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="all-cat" name="category" className="mr-2" />
                    <label htmlFor="all-cat" className="text-sm">All</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="local-cat" name="category" className="mr-2" />
                    <label htmlFor="local-cat" className="text-sm">Local</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="remote-cat" name="category" className="mr-2" />
                    <label htmlFor="remote-cat" className="text-sm">Remote</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Job Category</span>
                  <ChevronDown size={16} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="technical" className="mr-2" />
                    <label htmlFor="technical" className="text-sm">Technical</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="design" className="mr-2" checked />
                    <label htmlFor="design" className="text-sm">Design</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Location</span>
                  <ChevronDown size={16} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="accra" className="mr-2" checked />
                    <label htmlFor="accra" className="text-sm">Accra</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="kumasi" className="mr-2" />
                    <label htmlFor="kumasi" className="text-sm">Kumasi</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Price Range</span>
                  <ChevronDown size={16} />
                </div>
                <div className="px-2">
                  <div className="relative h-2 bg-gray-200 rounded-full mb-4">
                    <div className="absolute left-1/4 right-1/4 h-2 bg-indigo-500 rounded-full"></div>
                    <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full"></div>
                    <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">GH₵0</span>
                    <span className="text-xs">GH₵5000</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleApplyFilter}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-4"
              >
                APPLY NOW
              </button>
            </div>
          </div>

          {/* No Results Column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-4 border-b">
              <h2 className="font-semibold">No results found</h2>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-32 h-32 mb-4">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16C37.4903 16 16 37.4903 16 64C16 90.5097 37.4903 112 64 112Z" fill="#E6E6FF" />
                  <path d="M64 40V88" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
                  <path d="M40 64H88" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">No results found</h3>
              <p className="text-gray-500 text-center">
                The keyword you entered could not match any records. Please try again.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Panel Modal */}
        {showFilterPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold">Filter</h2>
                <button onClick={() => setShowFilterPanel(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Category</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="all-cat-modal" name="category-modal" className="mr-2" />
                      <label htmlFor="all-cat-modal" className="text-sm">All</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="local-cat-modal" name="category-modal" className="mr-2" />
                      <label htmlFor="local-cat-modal" className="text-sm">Local</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="remote-cat-modal" name="category-modal" className="mr-2" />
                      <label htmlFor="remote-cat-modal" className="text-sm">Remote</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Job Category</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="technical-modal" className="mr-2" />
                      <label htmlFor="technical-modal" className="text-sm">Technical</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="design-modal" className="mr-2" checked />
                      <label htmlFor="design-modal" className="text-sm">Design</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Price Range</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="px-2">
                    <div className="relative h-2 bg-gray-200 rounded-full mb-4">
                      <div className="absolute left-1/4 right-1/4 h-2 bg-indigo-500 rounded-full"></div>
                      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full"></div>
                      <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">GH₵0</span>
                      <span className="text-xs">GH₵5000</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleApplyFilter}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-4"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SearchFilter;
