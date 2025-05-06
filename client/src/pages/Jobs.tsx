import { useEffect, useState, useCallback, useMemo } from 'react';
import { Briefcase, CirclePlus, Filter, GraduationCap, MapPin } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchJobs, setCurrentPage, setLocation, setUniversity } from '../store/slices/jobsSlice';
import JobCard from '../components/jobs/JobCard';
import FilterPanel from '../components/jobs/FilterPanel';
import SearchBar from '../components/search/SearchBar';
import CategorySelector from '../components/search/CategorySelector';
import EmptyState from '../components/shared/EmptyState';
import CreateJobModal from '../components/jobs/CreateJobModal';
import { Job } from '../types';
import { throttle } from 'lodash';

function Jobs() {
  const dispatch = useAppDispatch();
  const { filteredJobs, loading, pagination } = useAppSelector((state) => state.jobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredUniversity, setHoveredUniversity] = useState<string | null>(null);

  // CSS variables for cursor position
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-x', '0px');
    document.documentElement.style.setProperty('--cursor-y', '0px');
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    }, 50),
    []
  );

  // Fetch jobs on component mount and add cursor effect listener
  useEffect(() => {
    dispatch(fetchJobs({ page: pagination.currentPage, limit: pagination.limit }));
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel();
    };
  }, [dispatch, pagination.currentPage, handleMouseMove]);

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle category selector
  const toggleCategorySelector = () => {
    setShowCategorySelector(!showCategorySelector);
  };

  // Toggle create job modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Filter jobs by university
  const handleUniversityFilter = useCallback((university: string) => {
    dispatch(setUniversity(university));
    setActiveTab(university || 'all');
  }, [dispatch]);

  // Ghana universities with their locations
  const universities = useMemo(() => [
    { id: 'ug', name: 'University of Ghana', shortName: 'UG', location: 'Legon, Accra' },
    { id: 'knust', name: 'Kwame Nkrumah University of Science and Technology', shortName: 'KNUST', location: 'Kumasi' },
    { id: 'ucc', name: 'University of Cape Coast', shortName: 'UCC', location: 'Cape Coast' },
    { id: 'gimpa', name: 'Ghana Institute of Management and Public Administration', shortName: 'GIMPA', location: 'Accra' },
    { id: 'uew', name: 'University of Education, Winneba', shortName: 'UEW', location: 'Winneba' },
  ], []);

  // Pagination component
  const Pagination = () => {
    const { currentPage, totalPages } = pagination;
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                page === currentPage
                  ? 'z-10 bg-secondary border-secondary text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden px-4 py-8 md:px-8">
      {/* Cursor light effect */}
      <div 
        className="cursor-light hidden md:block" 
        aria-hidden="true"
      />
      
      {/* Background elements with containment for better performance */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob contain-paint"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 contain-paint"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 contain-paint"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Job Opportunities</h1>
          <p className="text-gray-600 max-w-3xl">
            Find and apply for job opportunities at Ghana's top universities and organizations. 
            Whether you're looking for part-time work, internships, or full-time positions, 
            discover opportunities that match your skills and interests.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <SearchBar 
              onSearch={(term) => console.log('Search term:', term)} 
              placeholder="Search for jobs..."
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleFilter}
              className="btn-secondary flex items-center space-x-2 py-2 px-4"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <button
              onClick={toggleModal}
              className="btn-primary flex items-center space-x-2 py-2 px-4"
            >
              <CirclePlus size={18} />
              <span>Post a Job</span>
            </button>
          </div>
        </div>
        
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 min-w-full pb-2">
            <button
              onClick={() => handleUniversityFilter('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Universities
            </button>
            
            {universities.map((uni) => (
              <button
                key={uni.id}
                onClick={() => handleUniversityFilter(uni.name)}
                onMouseEnter={() => setHoveredUniversity(uni.id)}
                onMouseLeave={() => setHoveredUniversity(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                  activeTab === uni.name
                    ? 'bg-secondary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {uni.shortName}
                
                {hoveredUniversity === uni.id && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-white shadow-lg rounded-lg p-2 text-xs text-gray-700 w-max z-10">
                    <div className="flex flex-col">
                      <span className="font-bold">{uni.name}</span>
                      <span className="flex items-center mt-1">
                        <MapPin size={12} className="mr-1 text-secondary" />
                        {uni.location}
                      </span>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No jobs found"
            description="We couldn't find any jobs matching your criteria. Try adjusting your filters or check back later for new opportunities."
            icon={<Briefcase size={48} className="text-secondary" />}
            action={{
              label: "Post a Job",
              onClick: toggleModal
            }}
          />
        )}
        
        <Pagination />
      </div>
      
      {/* Filter Panel */}
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      
      {/* Category Selector */}
      {showCategorySelector && (
        <CategorySelector onClose={toggleCategorySelector} />
      )}
      
      {/* Create Job Modal */}
      <CreateJobModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default Jobs;
