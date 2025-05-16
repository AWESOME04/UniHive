import { Activity, BookOpen, Briefcase, Code, DollarSign, HeartPulse, Monitor, Utensils } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCategoryFilter } from '../../store/slices/tasksSlice';

const categories = [
  { id: 'design', name: 'Design', icon: <Monitor className="text-white" size={24} />, color: 'bg-secondary' },
  { id: 'finance', name: 'Finance', icon: <DollarSign className="text-white" size={24} />, color: 'bg-accent-orange' },
  { id: 'education', name: 'Education', icon: <BookOpen className="text-white" size={24} />, color: 'bg-accent-peach' },
  { id: 'restaurant', name: 'Restaurant', icon: <Utensils className="text-white" size={24} />, color: 'bg-secondary' },
  { id: 'health', name: 'Health', icon: <HeartPulse className="text-white" size={24} />, color: 'bg-accent-orange' },
  { id: 'programming', name: 'Programming', icon: <Code className="text-white" size={24} />, color: 'bg-secondary' },
];

function CategorySelector() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tasks);
  
  const handleCategoryClick = (categoryId: string) => {
    dispatch(setCategoryFilter(categoryId));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Specialization</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-default ${
              filters.category === category.id ? 'ring-2 ring-secondary ring-offset-2 shadow-md' : 'hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-2`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium">{category.name}</span>
            <span className="text-xs text-gray-500">120+ tasks</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
