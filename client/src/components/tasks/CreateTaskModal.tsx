import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { addTask } from '../../store/slices/tasksSlice';
import { Task } from '../../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const taskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  points: Yup.number().required('Points are required').min(1, 'Points must be at least 1'),
  deadline: Yup.date().nullable(),
  tags: Yup.string(),
});

function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    try {
      const tagsArray = values.tags
        ? values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : [];

      const newTask: Partial<Task> = {
        title: values.title,
        description: values.description,
        points: values.points,
        deadline: values.deadline || undefined,
        tags: tagsArray,
        status: 'open',
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
      };

      // Optimistically update the UI
      const taskWithId = {
        ...newTask,
        id: `temp-${Date.now()}`, // Temporary ID until server responds
      } as Task;
      
      dispatch(addTask(taskWithId));
      
      // In a real app, you would make an API call here
      // await axios.post('/api/tasks', newTask);
      
      resetForm();
      onClose();
      
      // Show success notification - could be done with a toast library
      console.log('Task created successfully!');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className={`bg-white rounded-2xl p-8 w-full max-w-lg mx-4 transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Task</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-default"
          >
            <X size={24} />
          </button>
        </div>

        <Formik
          initialValues={{
            title: '',
            description: '',
            points: 10,
            deadline: '',
            tags: '',
          }}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <Field
                  id="title"
                  name="title"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Enter a descriptive title"
                />
                <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Describe the task in detail"
                />
                <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                    Points
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
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline (Optional)
                  </label>
                  <Field
                    id="deadline"
                    name="deadline"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <ErrorMessage name="deadline" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <Field
                  id="tags"
                  name="tags"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="e.g. design, coding, research"
                />
                <ErrorMessage name="tags" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-default"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-default"
                >
                  {submitting ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateTaskModal;
