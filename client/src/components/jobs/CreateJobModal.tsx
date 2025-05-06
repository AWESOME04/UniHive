import { useState, useEffect } from 'react';
import { X, Plus, Calendar, MapPin, Briefcase, DollarSign, GraduationCap, Tag } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { createJob } from '../../store/slices/jobsSlice';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/formatUtils';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateJobModal({ isOpen, onClose }: CreateJobModalProps) {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    university: '',
    type: 'Full-time',
    salary: '',
    deadline: '',
    category: '',
    tags: [] as string[],
    requirements: [] as string[],
    responsibilities: [] as string[],
    benefits: [] as string[],
    applicationProcess: '',
    contactEmail: '',
    contactPhone: '',
    applicationUrl: '',
  });
  
  const [tagInput, setTagInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  
  const handleRequirementAdd = () => {
    if (requirementInput.trim() && !formData.requirements.includes(requirementInput.trim())) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput.trim()]
      });
      setRequirementInput('');
    }
  };
  
  const handleRequirementRemove = (requirement: string) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter(r => r !== requirement)
    });
  };
  
  const handleResponsibilityAdd = () => {
    if (responsibilityInput.trim() && !formData.responsibilities.includes(responsibilityInput.trim())) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, responsibilityInput.trim()]
      });
      setResponsibilityInput('');
    }
  };
  
  const handleResponsibilityRemove = (responsibility: string) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter(r => r !== responsibility)
    });
  };
  
  const handleBenefitAdd = () => {
    if (benefitInput.trim() && !formData.benefits.includes(benefitInput.trim())) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefitInput.trim()]
      });
      setBenefitInput('');
    }
  };
  
  const handleBenefitRemove = (benefit: string) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter(b => b !== benefit)
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Job title is required');
      return;
    }
    
    if (!formData.company.trim()) {
      toast.error('Company name is required');
      return;
    }
    
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return;
    }
    
    if (!formData.salary.trim()) {
      toast.error('Salary is required');
      return;
    }
    
    setLoading(true);
    
    try {
      // Format salary to ensure it has GH₵ prefix
      const formattedSalary = formData.salary.includes('GH₵') 
        ? formData.salary 
        : `GH₵${formData.salary}`;
      
      await dispatch(createJob({
        ...formData,
        salary: formattedSalary,
      })).unwrap();
      
      toast.success('Job posted successfully!');
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        description: '',
        location: '',
        university: '',
        type: 'Full-time',
        salary: '',
        deadline: '',
        category: '',
        tags: [],
        requirements: [],
        responsibilities: [],
        benefits: [],
        applicationProcess: '',
        contactEmail: '',
        contactPhone: '',
        applicationUrl: '',
      });
    } catch (error) {
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatSalaryPreview = () => {
    if (formData.salaryType === 'range' && formData.minSalary && formData.maxSalary) {
      return formatCurrency(formData.minSalary) + ' - ' + formatCurrency(formData.maxSalary);
    }
    return formData.salary ? formatCurrency(formData.salary) : 'Negotiable';
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:align-middle">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Post a Job</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Research Assistant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Department *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. University of Ghana - Economics Dept."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Provide a detailed description of the job..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-secondary" />
                <div className="flex-1">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Legon, Accra"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <GraduationCap size={18} className="text-secondary" />
                <div className="flex-1">
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <select
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  >
                    <option value="">Select University (if applicable)</option>
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
              </div>
              
              <div className="flex items-center space-x-2">
                <Briefcase size={18} className="text-secondary" />
                <div className="flex-1">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign size={18} className="text-secondary" />
                <div className="flex-1">
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                    Salary (GH₵) *
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. 1500 or 1000-2000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-secondary" />
                <div className="flex-1">
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                >
                  <option value="">Select Category</option>
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
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag size={18} className="text-secondary" />
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-dark-orange transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
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
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleRequirementAdd())}
                    placeholder="Add a requirement and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={handleRequirementAdd}
                    className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-dark-orange transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {formData.requirements.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-700">
                    {formData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{requirement}</span>
                        <button
                          type="button"
                          onClick={() => handleRequirementRemove(requirement)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleResponsibilityAdd())}
                    placeholder="Add a responsibility and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={handleResponsibilityAdd}
                    className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-dark-orange transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {formData.responsibilities.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-700">
                    {formData.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{responsibility}</span>
                        <button
                          type="button"
                          onClick={() => handleResponsibilityRemove(responsibility)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleBenefitAdd())}
                    placeholder="Add a benefit and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                  />
                  <button
                    type="button"
                    onClick={handleBenefitAdd}
                    className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-dark-orange transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {formData.benefits.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-700">
                    {formData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleBenefitRemove(benefit)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="applicationProcess" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Process
                </label>
                <textarea
                  id="applicationProcess"
                  name="applicationProcess"
                  value={formData.applicationProcess}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Explain how to apply for this job..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. jobs@uniofghana.edu.gh"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="e.g. +233 20 123 4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="applicationUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Application URL
                </label>
                <input
                  type="url"
                  id="applicationUrl"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleInputChange}
                  placeholder="e.g. https://careers.uniofghana.edu.gh/apply"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-dark-orange focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJobModal;
