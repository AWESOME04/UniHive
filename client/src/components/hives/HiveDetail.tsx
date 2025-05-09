import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XCircle, Save, Loader, Info } from 'lucide-react';
import { toast } from 'react-toastify';

export type HiveType = "essentials" | "academia" | "logistics" | "buzz" | "archive" | "sidehustle";

interface HiveDetailProps {
  hive: any;
  type: HiveType;
  onClose: () => void;
  onSave: (formData: any) => void;
}

const HiveDetail: React.FC<HiveDetailProps> = ({ hive, type, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [fields, setFields] = useState<{ name: string; label: string; type: string; required?: boolean }[]>([]);

  // Set up form fields based on hive type
  useEffect(() => {
    let typeFields: { name: string; label: string; type: string; required?: boolean }[] = [];
    
    switch (type) {
      case 'essentials':
        typeFields = [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'price', label: 'Price (₵)', type: 'number', required: true },
          { name: 'condition', label: 'Condition', type: 'select', required: true },
          { name: 'pickupLocation', label: 'Pickup Location', type: 'text', required: true }
        ];
        break;
      case 'academia':
        typeFields = [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'price', label: 'Price per hour (₵)', type: 'number', required: true },
          { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true }
        ];
        break;
      case 'logistics':
        typeFields = [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'price', label: 'Price (₵)', type: 'number', required: true },
          { name: 'specialInstructions', label: 'Special Instructions', type: 'textarea', required: false }
        ];
        break;
      case 'buzz':
        typeFields = [
          { name: 'title', label: 'Event Title', type: 'text', required: true },
          { name: 'description', label: 'Event Description', type: 'textarea', required: true },
          { name: 'eventDate', label: 'Event Date & Time', type: 'datetime-local', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'organizer', label: 'Organizer', type: 'text', required: true },
          { name: 'eventType', label: 'Event Type', type: 'select', required: true },
          { name: 'admission', label: 'Admission', type: 'select', required: true },
          { name: 'capacity', label: 'Capacity', type: 'number', required: true },
          { name: 'registrationLink', label: 'Registration Link', type: 'url', required: false },
          { name: 'isItem13', label: 'Need to be 13 or older?', type: 'checkbox' }
        ];
        break;
      case 'archive':
        typeFields = [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'fileUrl', label: 'File URL', type: 'text', required: true }
        ];
        break;
      case 'sidehustle':
        typeFields = [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'price', label: 'Price (₵)', type: 'number', required: true },
          { name: 'applicationDeadline', label: 'Application Deadline', type: 'date', required: true }
        ];
        break;
      default:
        break;
    }
    
    setFields(typeFields);
    
    // Initialize form data with hive values
    const initialData: any = {};
    typeFields.forEach(field => {
      initialData[field.name] = hive[field.name] || '';
    });
    
    setFormData(initialData);
  }, [hive, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: val
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      await onSave(formData);
      toast.success('Hive updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update hive. Please try again.');
      console.error('Error updating hive:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Render form fields based on type
  const renderField = (field: { name: string; label: string; type: string; required?: boolean }) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            rows={4}
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Select {field.label}</option>
            {field.name === 'condition' && [
              <option key="new" value="new">New</option>,
              <option key="like-new" value="like-new">Like New</option>,
              <option key="good" value="good">Good</option>,
              <option key="fair" value="fair">Fair</option>,
              <option key="poor" value="poor">Poor</option>
            ]}
            {field.name === 'eventType' && [
              <option key="workshop" value="workshop">Workshop</option>,
              <option key="seminar" value="seminar">Seminar</option>,
              <option key="conference" value="conference">Conference</option>,
              <option key="party" value="party">Party</option>,
              <option key="sports" value="sports">Sports</option>,
              <option key="cultural" value="cultural">Cultural</option>,
              <option key="academic" value="academic">Academic</option>,
              <option key="other" value="other">Other</option>
            ]}
            {field.name === 'admission' && [
              <option key="free" value="free">Free</option>,
              <option key="paid" value="paid">Paid</option>,
              <option key="donation" value="donation">Donation</option>
            ]}
          </select>
        );
      case 'checkbox':
        return (
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
          />
        );
      default:
        return (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {hive.id ? 'Edit' : 'Create'} {type.charAt(0).toUpperCase() + type.slice(1)} Hive
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
          
          {type === 'essentials' && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <div className="flex">
                <Info size={18} className="text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Remember to include clear details about the item's condition, age, and any defects. This helps buyers make informed decisions.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              {isSaving ? (
                <span className="flex items-center">
                  <Loader size={16} className="animate-spin mr-2" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default HiveDetail;
