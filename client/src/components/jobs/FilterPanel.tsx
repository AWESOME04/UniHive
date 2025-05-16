import { useState } from 'react';
import { ChevronDown, DollarSign, X, Tag, MapPin, Briefcase, Clock, Award, Building, Users, Layers, GraduationCap } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { setJobFilters } from '../../store/slices/jobsSlice';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

interface LocalFilters {
  tags: string[];
  startDate: string;
  endDate: string;
  minSalary: number;
  maxSalary: number;
  status: string[];
  category: string;
  university: string;
  location: string;
  jobType: string[];
  experienceLevel: string;
  positionLevel: string;
  lastUpdated: string;
  [key: string]: string | string[] | number; // Index signature to allow string indexing
}

function AccordionSection({ title, children, defaultOpen = false, icon }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-3">
      <button 
        className="flex justify-between items-center w-full py-2 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <div className="mr-2 text-secondary">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors duration-200">{title}</h3>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="pt-3 pb-1">
          {children}
        </div>
      )}
    </div>
  );
}

function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector((state) => state.jobs.filters);
  
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    tags: [...currentFilters.tags],
    startDate: currentFilters.startDate,
    endDate: currentFilters.endDate,
    minSalary: currentFilters.minSalary,
    maxSalary: currentFilters.maxSalary,
    status: [...currentFilters.status],
    category: currentFilters.category,
    university: currentFilters.university,
    location: currentFilters.location,
    jobType: [...currentFilters.jobType],
    experienceLevel: currentFilters.experienceLevel,
    positionLevel: currentFilters.positionLevel,
    lastUpdated: currentFilters.lastUpdated,
  });
  
  const [tagInput, setTagInput] = useState('');
  
  const handleTagAdd = () => {
    if (tagInput.trim() && !localFilters.tags.includes(tagInput.trim())) {
      setLocalFilters({
        ...localFilters,
        tags: [...localFilters.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setLocalFilters({
      ...localFilters,
      tags: localFilters.tags.filter(t => t !== tag)
    });
  };
  
  const handleStatusToggle = (status: string) => {
    if (localFilters.status.includes(status)) {
      setLocalFilters({
        ...localFilters,
        status: localFilters.status.filter(s => s !== status)
      });
    } else {
      setLocalFilters({
        ...localFilters,
        status: [...localFilters.status, status]
      });
    }
  };
  
  const handleJobTypeToggle = (type: string) => {
    if (localFilters.jobType.includes(type)) {
      setLocalFilters({
        ...localFilters,
        jobType: localFilters.jobType.filter(t => t !== type)
      });
    } else {
      setLocalFilters({
        ...localFilters,
        jobType: [...localFilters.jobType, type]
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };
  
  const handleSalaryRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setLocalFilters({
        ...localFilters,
        minSalary: value[0],
        maxSalary: value[1]
      });
    }
  };
  
  const handleApplyFilters = () => {
    dispatch(setJobFilters({
      ...localFilters,
      tags: [...localFilters.tags],
      status: [...localFilters.status],
      jobType: [...localFilters.jobType]
    }));
    toast.success('Filters applied successfully');
    onClose();
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      tags: [],
      startDate: '',
      endDate: '',
      minSalary: 0,
      maxSalary: 10000,
      status: [],
      category: '',
      university: '',
      location: '',
      jobType: [],
      experienceLevel: '',
      positionLevel: '',
      lastUpdated: '',
    };
    
    setLocalFilters(resetFilters);
    dispatch(setJobFilters(resetFilters));
    toast.info('Filters have been reset');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white shadow-xl overflow-y-auto animate-slideInRight">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close filter panel"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          <AccordionSection 
            title="Keywords & Tags" 
            defaultOpen={true}
            icon={<Tag size={18} />}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Tags
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTagAdd()}
                  placeholder="Add a tag and press Enter"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
                />
                <button
                  onClick={handleTagAdd}
                  className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-dark-orange transition-colors"
                >
                  Add
                </button>
              </div>
              
              {localFilters.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {localFilters.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-orange text-secondary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-secondary hover:bg-secondary hover:text-white focus:outline-none"
                      >
                        <span className="sr-only">Remove {tag}</span>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Job Status" 
            icon={<Clock size={18} />}
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="status-open"
                  type="checkbox"
                  checked={localFilters.status.includes('open')}
                  onChange={() => handleStatusToggle('open')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="status-open" className="ml-2 block text-sm text-gray-700">
                  Open
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="status-in-progress"
                  type="checkbox"
                  checked={localFilters.status.includes('in-progress')}
                  onChange={() => handleStatusToggle('in-progress')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="status-in-progress" className="ml-2 block text-sm text-gray-700">
                  In Progress
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="status-completed"
                  type="checkbox"
                  checked={localFilters.status.includes('completed')}
                  onChange={() => handleStatusToggle('completed')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="status-completed" className="ml-2 block text-sm text-gray-700">
                  Completed
                </label>
              </div>
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="University" 
            icon={<GraduationCap size={18} />}
          >
            <div className="mb-3">
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                Select University
              </label>
              <select
                id="university"
                name="university"
                value={localFilters.university}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">All Universities</option>
                <option value="University of Ghana">University of Ghana</option>
                <option value="Kwame Nkrumah University of Science and Technology">KNUST</option>
                <option value="University of Cape Coast">University of Cape Coast</option>
                <option value="Ghana Institute of Management and Public Administration">GIMPA</option>
                <option value="University of Education, Winneba">University of Education, Winneba</option>
                <option value="Ashesi University">Ashesi University</option>
                <option value="University of Professional Studies, Accra">UPSA</option>
                <option value="Ghana Communication Technology University">GCTU</option>
              </select>
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Location" 
            icon={<MapPin size={18} />}
          >
            <div className="mb-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={localFilters.location}
                onChange={handleInputChange}
                placeholder="Enter city or region"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
              />
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Job Type" 
            icon={<Briefcase size={18} />}
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="type-full-time"
                  type="checkbox"
                  checked={localFilters.jobType.includes('Full-time')}
                  onChange={() => handleJobTypeToggle('Full-time')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="type-full-time" className="ml-2 block text-sm text-gray-700">
                  Full-time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="type-part-time"
                  type="checkbox"
                  checked={localFilters.jobType.includes('Part-time')}
                  onChange={() => handleJobTypeToggle('Part-time')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="type-part-time" className="ml-2 block text-sm text-gray-700">
                  Part-time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="type-contract"
                  type="checkbox"
                  checked={localFilters.jobType.includes('Contract')}
                  onChange={() => handleJobTypeToggle('Contract')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="type-contract" className="ml-2 block text-sm text-gray-700">
                  Contract
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="type-internship"
                  type="checkbox"
                  checked={localFilters.jobType.includes('Internship')}
                  onChange={() => handleJobTypeToggle('Internship')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="type-internship" className="ml-2 block text-sm text-gray-700">
                  Internship
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="type-volunteer"
                  type="checkbox"
                  checked={localFilters.jobType.includes('Volunteer')}
                  onChange={() => handleJobTypeToggle('Volunteer')}
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="type-volunteer" className="ml-2 block text-sm text-gray-700">
                  Volunteer
                </label>
              </div>
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Salary Range" 
            icon={<DollarSign size={18} />}
          >
            <div className="mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">GH₵{localFilters.minSalary}</span>
                <span className="text-sm text-gray-600">GH₵{localFilters.maxSalary}</span>
              </div>
              <Slider
                range
                min={0}
                max={10000}
                value={[localFilters.minSalary, localFilters.maxSalary]}
                onChange={handleSalaryRangeChange}
                railStyle={{ backgroundColor: '#E5E7EB' }}
                trackStyle={[{ backgroundColor: '#FF6B35' }]}
                handleStyle={[
                  { borderColor: '#FF6B35', backgroundColor: '#FF6B35' },
                  { borderColor: '#FF6B35', backgroundColor: '#FF6B35' }
                ]}
              />
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Date Posted" 
            icon={<Clock size={18} />}
          >
            <div className="space-y-3">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={localFilters.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={localFilters.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
                />
              </div>
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Job Category" 
            icon={<Layers size={18} />}
          >
            <div className="mb-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Select Category
              </label>
              <select
                id="category"
                name="category"
                value={localFilters.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">All Categories</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Education">Education</option>
                <option value="Research">Research</option>
                <option value="Administration">Administration</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Engineering">Engineering</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Hospitality">Hospitality</option>
              </select>
            </div>
          </AccordionSection>
          
          <AccordionSection 
            title="Experience Level" 
            icon={<Award size={18} />}
          >
            <div className="mb-3">
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Required
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={localFilters.experienceLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary text-sm"
              >
                <option value="">All Levels</option>
                <option value="no-experience">No Experience</option>
                <option value="entry-level">Entry Level</option>
                <option value="1-3-years">1-3 Years</option>
                <option value="3-5-years">3-5 Years</option>
                <option value="5-plus-years">5+ Years</option>
              </select>
            </div>
          </AccordionSection>
          
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleApplyFilters}
              className="flex-1 bg-secondary text-white py-2 px-4 rounded-md hover:bg-dark-orange transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
