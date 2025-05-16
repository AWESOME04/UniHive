import { useState } from 'react';
import { ChevronRight, Check, User } from 'lucide-react';
import Layout from '../components/layout/Layout';

interface FormStep {
  id: string;
  title: string;
  isCompleted: boolean;
}

function AddJobPosting() {
  const [currentStep, setCurrentStep] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    location: '',
    university: '',
    salary: '',
    deadline: '',
    skills: [] as string[],
    contactEmail: '',
    contactPhone: ''
  });

  const steps: FormStep[] = [
    { id: 'create', title: 'Create Job', isCompleted: false },
    { id: 'add', title: 'Add a job', isCompleted: false },
    { id: 'edit', title: 'Edit Add a job', isCompleted: false },
    { id: 'position', title: 'Job Position', isCompleted: false },
    { id: 'workplace', title: 'Type of workplace', isCompleted: false },
    { id: 'location', title: 'Location', isCompleted: false },
    { id: 'jobType', title: 'Choose Job Type', isCompleted: false },
    { id: 'share', title: 'Shared a Job', isCompleted: false }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      // Mark current step as completed
      steps[currentIndex].isCompleted = true;
      // Move to next step
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'create':
        return (
          <div className="p-6 flex flex-col items-center">
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold mb-2">Post your first task</h3>
              <p className="text-sm text-gray-500">Fill in the details to create a new task</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full mb-6">
              <div className="bg-orange-100 p-3 rounded-lg flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">💻</span>
                <span className="text-xs font-medium">Technical</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">💰</span>
                <span className="text-xs font-medium">Finance</span>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg flex flex-col items-center justify-center">
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
            
            <div className="w-full mb-6">
              <p className="text-sm text-gray-700 mb-2">What can we do for you?</p>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Describe the task you need help with..."
              ></textarea>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
            >
              POST A JOB
            </button>
          </div>
        );
        
      case 'add':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add a job</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Job title</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Type of workplace</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Job location</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Job category</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Company</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Employment type</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Description</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border-b">
                <span className="font-medium">Salary</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-6"
            >
              CONTINUE
            </button>
          </div>
        );
        
      case 'position':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Job Position</h3>
            
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Position</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., UX/UI Designer"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company</label>
                <input 
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., University of Ghana"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Legon Campus"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input 
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., GH₵1.5K"
                />
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-6"
            >
              CONTINUE
            </button>
          </div>
        );
        
      case 'workplace':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Type of workplace</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Choose the type of workplace</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="radio" id="on-site" name="type" value="on-site" onChange={handleInputChange} className="mr-3" />
                    <label htmlFor="on-site" className="flex-1">
                      <span className="font-medium">On-site</span>
                      <p className="text-sm text-gray-500">Employees come to work in person</p>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="radio" id="hybrid" name="type" value="hybrid" onChange={handleInputChange} className="mr-3" />
                    <label htmlFor="hybrid" className="flex-1">
                      <span className="font-medium">Hybrid</span>
                      <p className="text-sm text-gray-500">Employees work on-site and remotely</p>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="radio" id="remote" name="type" value="remote" onChange={handleInputChange} className="mr-3" />
                    <label htmlFor="remote" className="flex-1">
                      <span className="font-medium">Remote</span>
                      <p className="text-sm text-gray-500">Employees work remotely</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-6"
            >
              CONTINUE
            </button>
          </div>
        );
        
      case 'share':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Shared a Job</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">UX/UI Designer</h4>
                  <p className="text-sm text-gray-500">University of Ghana, Legon campus</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                We are looking for a talented UX/UI Designer to join our team at the University of Ghana. The ideal candidate will have experience in designing intuitive and engaging user interfaces.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">Design</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">Part time</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">Remote</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Posted just now</span>
                <span className="font-medium">GH₵1.5K</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="facebook" className="mr-3" />
                <label htmlFor="facebook" className="font-medium">Facebook</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="twitter" className="mr-3" />
                <label htmlFor="twitter" className="font-medium">Twitter</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="linkedin" className="mr-3" checked />
                <label htmlFor="linkedin" className="font-medium">LinkedIn</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="whatsapp" className="mr-3" />
                <label htmlFor="whatsapp" className="font-medium">WhatsApp</label>
              </div>
            </div>
            
            <button 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium mt-6"
            >
              SHARE
            </button>
          </div>
        );
        
      default:
        return (
          <div className="p-6 text-center">
            <p>Step content not available</p>
            <button 
              onClick={handleNext}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium mt-4"
            >
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Add Job Posting</h1>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">{index === 0 ? 'Create Job' : step.title}</h2>
              </div>
              
              {currentStep === step.id ? (
                renderStepContent()
              ) : (
                <div className="p-6 flex items-center justify-center">
                  {step.isCompleted ? (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={20} className="text-green-600" />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      {index > steps.findIndex(s => s.id === currentStep) 
                        ? 'Pending completion' 
                        : 'Completed'}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AddJobPosting;
