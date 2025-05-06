import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { addTask } from '../store/slices/tasksSlice';

function CreateTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 10,
    tags: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    points: '',
    tags: '',
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      points: '',
      tags: '',
    };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
      isValid = false;
    }

    if (formData.points <= 0) {
      newErrors.points = 'Points must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'points' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      const newTask = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        points: formData.points,
        tags: tagsArray,
        createdBy: 'current-user',
        createdAt: new Date().toISOString(),
        status: 'open' as const,
      };

      dispatch(addTask(newTask));
      navigate('/tasks');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
                Task Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter a descriptive title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="description"
              >
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe the task in detail"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="points">
                Points
              </label>
              <input
                id="points"
                name="points"
                type="number"
                min="1"
                className={`w-full px-3 py-2 border ${
                  errors.points ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Assign point value"
                value={formData.points}
                onChange={handleChange}
              />
              {errors.points && <p className="mt-1 text-sm text-red-500">{errors.points}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.tags ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g. coding, research, design"
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={() => navigate('/tasks')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
