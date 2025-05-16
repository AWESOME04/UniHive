import { useState } from 'react';
import { ChevronDown, DollarSign, X, Tag, MapPin, Briefcase, Clock, Award, Building, Users, Layers } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { setTaskFilters } from '../../store/slices/tasksSlice';

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
  minPoints: number;
  maxPoints: number;
  status: string[];
  category: string;
  subcategory: string;
  location: string;
  workplaceType: string[];
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
          size={16} 
          className={`transition-transform duration-300 text-gray-500 group-hover:text-secondary ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="mt-3 pb-2 pl-6">
          {children}
        </div>
      )}
    </div>
  );
}

function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tasks);
  
  // Local state for filter values
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    tags: filters.tags || [],
    startDate: filters.startDate || '',
    endDate: filters.endDate || '',
    minPoints: filters.minPoints || 0,
    maxPoints: filters.maxPoints || 100,
    status: filters.status || [],
    category: filters.category || '',
    subcategory: filters.subcategory || '',
    location: filters.location || '',
    workplaceType: filters.workplaceType || [],
    experienceLevel: filters.experienceLevel || '',
    positionLevel: filters.positionLevel || '',
    lastUpdated: filters.lastUpdated || '',
  });
  
  // Available options
  const availableTags = ['coding', 'design', 'research', 'writing', 'math', 'science'];
  const statusOptions = ['open', 'in-progress', 'completed'];
  const subcategoryOptions: Record<string, string[]> = {
    design: ['UX/UI Design', 'Graphic Design', 'Web Design'],
    programming: ['Frontend', 'Backend', 'Full Stack', 'Mobile'],
    education: ['Tutoring', 'Exam Prep', 'Research'],
  };
  const workplaceOptions = ['on-site', 'remote', 'hybrid'];
  const positionLevelOptions = ['intern', 'junior', 'mid-level', 'senior', 'manager'];
  const experienceOptions = [
    {value: 'no-experience', label: 'No experience'},
    {value: 'less-than-1-year', label: 'Less than a year'},
    {value: '1-3-years', label: '1-3 years'},
    {value: '3-5-years', label: '3-5 years'},
    {value: '5-plus-years', label: '5+ years'},
  ];
  const lastUpdatedOptions = [
    {value: 'today', label: 'Today'},
    {value: 'last-week', label: 'Last week'},
    {value: 'last-month', label: 'Last month'},
    {value: 'any-time', label: 'Any time'},
  ];
  
  // Handle checkbox changes
  const handleCheckboxChange = (field: string, value: string) => {
    setLocalFilters(prev => {
      const currentValue = prev[field];
      
      // If it's an array field, toggle the value
      if (Array.isArray(currentValue)) {
        const updatedValues = currentValue.includes(value)
          ? currentValue.filter(v => v !== value)
          : [...currentValue, value];
        
        return { ...prev, [field]: updatedValues };
      }
      
      // If it's a single value field, set/unset the value
      return { 
        ...prev, 
        [field]: prev[field] === value ? '' : value 
      };
    });
  };
  
  // Handle radio changes
  const handleRadioChange = (field: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };
  
  // Apply filters
  const applyFilters = () => {
    dispatch(setTaskFilters(localFilters));
    toast.success('Filters applied successfully');
    onClose();
  };
  
  // Reset filters
  const resetFilters = () => {
    const resetValues: LocalFilters = {
      tags: [],
      startDate: '',
      endDate: '',
      minPoints: 0,
      maxPoints: 100,
      status: [],
      category: '',
      subcategory: '',
      location: '',
      workplaceType: [],
      experienceLevel: '',
      positionLevel: '',
      lastUpdated: '',
    };
    setLocalFilters(resetValues);
    dispatch(setTaskFilters(resetValues));
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-full sm:w-96 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
      } overflow-y-auto border-r border-white/20`}
    >
      {/* Background patterns */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-secondary opacity-5 pointer-events-none"></div>
      <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-accent-purple opacity-5 pointer-events-none"></div>
      
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Filter Side Hustles</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-light-orange/20 text-secondary transition-all duration-300 transform hover:rotate-90"
            aria-label="Close filter panel"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">Refine your search to find the perfect opportunity</p>
      </div>
      
      <div className="p-6">
        <AccordionSection 
          title="Category" 
          defaultOpen 
          icon={<Briefcase size={18} />}
        >
          <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2">
            {Object.keys(subcategoryOptions).map(category => (
              <div key={category} className="flex items-center group">
                <div className="relative">
                  <input
                    id={`category-${category}`}
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary rounded border-gray-300 transition-all duration-200"
                    checked={localFilters.category === category}
                    onChange={() => handleCheckboxChange('category', category)}
                  />
                  <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <label 
                  htmlFor={`category-${category}`} 
                  className="ml-2 text-sm text-gray-700 capitalize group-hover:text-secondary transition-colors duration-200"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </AccordionSection>
        
        {localFilters.category && subcategoryOptions[localFilters.category] && (
          <AccordionSection 
            title="Sub Category" 
            defaultOpen 
            icon={<Layers size={18} />}
          >
            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2">
              {subcategoryOptions[localFilters.category].map((subcategory: string) => (
                <div key={subcategory} className="flex items-center group">
                  <div className="relative">
                    <input
                      id={`subcategory-${subcategory}`}
                      type="checkbox"
                      className="h-4 w-4 text-secondary focus:ring-secondary rounded border-gray-300"
                      checked={localFilters.subcategory === subcategory}
                      onChange={() => handleCheckboxChange('subcategory', subcategory)}
                    />
                    <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <label 
                    htmlFor={`subcategory-${subcategory}`} 
                    className="ml-2 text-sm text-gray-700 group-hover:text-secondary transition-colors duration-200"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}
        
        <AccordionSection 
          title="Location" 
          icon={<MapPin size={18} />}
        >
          <input
            type="text"
            placeholder="Filter by location"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 bg-white/80"
            value={localFilters.location}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
          />
        </AccordionSection>
        
        <AccordionSection 
          title="Last update" 
          icon={<Clock size={18} />}
        >
          <div className="space-y-3">
            {lastUpdatedOptions.map(option => (
              <div key={option.value} className="flex items-center group">
                <div className="relative">
                  <input
                    id={`last-updated-${option.value}`}
                    type="radio"
                    className="h-4 w-4 text-secondary focus:ring-secondary rounded-full border-gray-300"
                    checked={localFilters.lastUpdated === option.value}
                    onChange={() => handleRadioChange('lastUpdated', option.value)}
                  />
                  <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <label 
                  htmlFor={`last-updated-${option.value}`} 
                  className="ml-2 text-sm text-gray-700 group-hover:text-secondary transition-colors duration-200"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Type of workplace" 
          icon={<Building size={18} />}
        >
          <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2">
            {workplaceOptions.map(type => (
              <div key={type} className="flex items-center group">
                <div className="relative">
                  <input
                    id={`workplace-${type}`}
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary rounded border-gray-300"
                    checked={localFilters.workplaceType.includes(type)}
                    onChange={() => handleCheckboxChange('workplaceType', type)}
                  />
                  <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <label 
                  htmlFor={`workplace-${type}`} 
                  className="ml-2 text-sm text-gray-700 capitalize group-hover:text-secondary transition-colors duration-200"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Position level" 
          icon={<Award size={18} />}
        >
          <div className="flex flex-wrap gap-2">
            {positionLevelOptions.map(level => (
              <button
                key={level}
                onClick={() => handleRadioChange('positionLevel', level)}
                className={`px-4 py-2 text-sm rounded-xl border transition-all duration-300 ${
                  localFilters.positionLevel === level 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'border-gray-300 text-gray-700 hover:bg-light-orange/20 hover:border-secondary/50'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Experience" 
          icon={<Users size={18} />}
        >
          <div className="space-y-3">
            {experienceOptions.map(option => (
              <div key={option.value} className="flex items-center group">
                <div className="relative">
                  <input
                    id={`experience-${option.value}`}
                    type="radio"
                    className="h-4 w-4 text-secondary focus:ring-secondary rounded-full border-gray-300"
                    checked={localFilters.experienceLevel === option.value}
                    onChange={() => handleRadioChange('experienceLevel', option.value)}
                  />
                  <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <label 
                  htmlFor={`experience-${option.value}`} 
                  className="ml-2 text-sm text-gray-700 group-hover:text-secondary transition-colors duration-200"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Status" 
          icon={<Clock size={18} />}
        >
          <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2">
            {statusOptions.map(status => (
              <div key={status} className="flex items-center group">
                <div className="relative">
                  <input
                    id={`status-${status}`}
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary rounded border-gray-300"
                    checked={localFilters.status.includes(status)}
                    onChange={() => handleCheckboxChange('status', status)}
                  />
                  <div className="absolute inset-0 bg-secondary/10 scale-0 rounded-full group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <label 
                  htmlFor={`status-${status}`} 
                  className="ml-2 text-sm text-gray-700 capitalize group-hover:text-secondary transition-colors duration-200"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Points Range" 
          icon={<DollarSign size={18} />}
        >
          <div className="px-2 pt-4">
            <Slider
              range
              min={0}
              max={100}
              value={[localFilters.minPoints, localFilters.maxPoints]}
              onChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  setLocalFilters(prev => ({ 
                    ...prev, 
                    minPoints: value[0], 
                    maxPoints: value[1] 
                  }));
                }
              }}
              trackStyle={[{ backgroundColor: '#FF4500' }]}
              handleStyle={[
                { backgroundColor: 'white', borderColor: '#FF6B35', boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)' },
                { backgroundColor: 'white', borderColor: '#FF6B35', boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)' }
              ]}
              railStyle={{ backgroundColor: '#E5E7EB' }}
            />
            <div className="flex justify-between mt-3 text-sm">
              <span className="font-medium text-gray-700">{localFilters.minPoints} points</span>
              <span className="font-medium text-gray-700">{localFilters.maxPoints} points</span>
            </div>
          </div>
        </AccordionSection>
        
        <AccordionSection 
          title="Tags" 
          icon={<Tag size={18} />}
        >
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleCheckboxChange('tags', tag)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  localFilters.tags.includes(tag)
                    ? 'bg-secondary text-white' 
                    : 'bg-light-orange/20 text-secondary hover:bg-light-orange/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </AccordionSection>
        
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md pt-6 pb-8 flex gap-4 border-t border-gray-200 mt-6">
          <button
            onClick={resetFilters}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            Reset All
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 py-3 px-4 bg-secondary text-white rounded-xl text-sm font-medium hover:bg-dark-orange transition-all duration-300 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white group-hover:translate-x-0 opacity-10"></span>
            <span className="relative">Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
