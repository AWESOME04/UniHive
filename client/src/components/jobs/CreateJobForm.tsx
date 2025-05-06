import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BriefcaseBusiness, Building, ChevronRight, FileText, MapPin, Plus, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store';
import { addTask } from '../../store/slices/tasksSlice';

const jobSchema = Yup.object().shape({
  title: Yup.string().required('Job title is required'),
  description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  workplace: Yup.string().required('Workplace type is required'),
  location: Yup.string().required('Location is required'),
  jobType: Yup.string().required('Job type is required'),
  points: Yup.number().required('Points value is required').min(1, 'Must be at least 1 point'),
  category: Yup.string().required('Category is required'),
});

const jobTypes = [
  { id: 'full-time', name: 'Full time' },
  { id: 'part-time', name: 'Part time' },
  { id: 'contract', name: 'Contract' },
  { id: 'temporary', name: 'Temporary' },
  { id: 'volunteer', name: 'Volunteer' },
  { id: 'apprenticeship', name: 'Apprenticeship' },
];

const workplaceTypes = [
  { id: 'on-site', name: 'On-site' },
  { id: 'hybrid', name: 'Hybrid' },
  { id: 'remote', name: 'Remote' },
];

const categories = [
  { id: 'design', name: 'Design' },
  { id: 'programming', name: 'Programming' },
  { id: 'education', name: 'Education' },
  { id: 'finance', name: 'Finance' },
  { id: 'health', name: 'Health' },
  { id: 'restaurant', name: 'Restaurant' },
];

function CreateJobForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    workplace: '',
    location: '',
    company: '',
    jobType: '',
    points: 10,
    category: '',
  });

  const handleNext = (values) => {
    setFormData({ ...formData, ...values });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values) => {
    const finalData = { ...formData, ...values };
    
    // Create the job/task
    const newTask = {
      id: `task-${Date.now()}`,
      title: finalData.title,
      description: finalData.description,
      createdAt: new Date().toISOString(),
      status: 'open',
      createdBy: 'current-user',
      points: finalData.points,
      tags: [finalData.category, finalData.jobType, finalData.workplace],
      location: finalData.location,
      category: finalData.category,
      workplaceType: finalData.workplace,
    };
    
    dispatch(addTask(newTask));
    toast.success('Job created successfully!');
    navigate('/tasks');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl-soft p-6">
        <div className="relative mb-6">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="absolute top-0 left-0 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          )}
          <h1 className="text-2xl font-bold text-center">
            {step === 1 ? 'Add a job' : step === 2 ? 'Job details' : 'Review and submit'}
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`flex items-center ${s < step ? 'text-secondary' : s === step ? 'text-primary' : 'text-gray-400'}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  s < step 
                    ? 'bg-secondary text-white' 
                    : s === step 
                      ? 'border-2 border-secondary text-secondary' 
                      : 'border-2 border-gray-300'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              <span className="hidden sm:inline">
                {s === 1 ? 'Basic info' : s === 2 ? 'Details' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <Formik
            initialValues={{
              title: formData.title,
              category: formData.category,
              workplace: formData.workplace,
              location: formData.location,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Job title is required'),
              category: Yup.string().required('Category is required'),
              workplace: Yup.string().required('Workplace type is required'),
              location: Yup.string().required('Location is required'),
            })}
            onSubmit={handleNext}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job position*
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Administrative Assistant"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of workplace*
                  </label>
                  <div className="space-y-2">
                    {workplaceTypes.map(type => (
                      <label key={type.id} className="flex items-center space-x-3">
                        <Field
                          type="radio"
                          name="workplace"
                          value={type.id}
                          className="h-5 w-5 text-secondary focus:ring-secondary"
                        />
                        <span>{type.name}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="workplace" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Job location*
                  </label>
                  <div className="relative">
                    <Field
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City, State"
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage name="location" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-secondary hover:bg-opacity-90 focus:outline-none"
                  >
                    Continue
                    <ChevronRight size={18} className="ml-2" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <Formik
            initialValues={{
              company: formData.company,
              jobType: formData.jobType,
              description: formData.description,
              points: formData.points,
            }}
            validationSchema={Yup.object({
              company: Yup.string().required('Company name is required'),
              jobType: Yup.string().required('Job type is required'),
              description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
              points: Yup.number().required('Points value is required').min(1, 'Must be at least 1 point'),
            })}
            onSubmit={handleNext}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company*
                  </label>
                  <div className="relative">
                    <Field
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company name"
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <Building size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage name="company" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                    Employment type*
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    {jobTypes.map(type => (
                      <label 
                        key={type.id} 
                        className="flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-secondary"
                      >
                        <Field
                          type="radio"
                          name="jobType"
                          value={type.id}
                          className="h-4 w-4 text-secondary focus:ring-secondary mr-2"
                        />
                        <span className="text-sm">{type.name}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="jobType" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                    Points value*
                  </label>
                  <Field
                    id="points"
                    name="points"
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <ErrorMessage name="points" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <div className="relative">
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Describe the responsibilities, qualifications, and benefits"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <FileText size={20} className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-secondary hover:bg-opacity-90 focus:outline-none"
                  >
                    Review
                    <ChevronRight size={18} className="ml-2" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">{formData.title}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{formData.company}</p>
                    <p className="text-gray-500 text-sm">{formData.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-light-peach text-secondary rounded-full text-xs">
                    {formData.category}
                  </span>
                  <span className="px-3 py-1 bg-light-peach text-secondary rounded-full text-xs">
                    {formData.jobType}
                  </span>
                  <span className="px-3 py-1 bg-light-peach text-secondary rounded-full text-xs">
                    {formData.workplace}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Description</h4>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{formData.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Points</h4>
                  <p className="text-gray-700 text-sm">{formData.points}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(formData)}
                className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-secondary hover:bg-opacity-90 focus:outline-none"
              >
                Post Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateJobForm;
