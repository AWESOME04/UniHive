import React from 'react';
import { Briefcase, GraduationCap, Users, CirclePlus, Search, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  description?: string;
}

const ghanaJobCategories: JobCategory[] = [
  { 
    id: 'tech',
    icon: <Briefcase size={24} />, 
    name: 'Tech & IT', 
    count: 124, 
    color: 'bg-blue-100 text-blue-600',
    description: 'Software development, IT support, web design, and more tech opportunities.'
  },
  { 
    id: 'education',
    icon: <GraduationCap size={24} />, 
    name: 'Education & Tutoring', 
    count: 98, 
    color: 'bg-green-100 text-green-600',
    description: 'Teaching, tutoring, and educational content creation roles.'
  },
  { 
    id: 'events',
    icon: <Users size={24} />, 
    name: 'Event Management', 
    count: 87, 
    color: 'bg-purple-100 text-purple-600',
    description: 'Event planning, coordination, and on-site management opportunities.'
  },
  { 
    id: 'healthcare',
    icon: <CirclePlus size={24} />, 
    name: 'Healthcare', 
    count: 76, 
    color: 'bg-red-100 text-red-600',
    description: 'Healthcare support, wellness coaching, and medical assistance roles.'
  },
  { 
    id: 'research',
    icon: <Search size={24} />, 
    name: 'Market Research', 
    count: 65, 
    color: 'bg-yellow-100 text-yellow-600',
    description: 'Data collection, surveys, and market analysis projects.'
  },
  { 
    id: 'logistics',
    icon: <MapPin size={24} />, 
    name: 'Delivery & Logistics', 
    count: 54, 
    color: 'bg-indigo-100 text-indigo-600',
    description: 'Package delivery, logistics coordination, and transportation services.'
  },
  { 
    id: 'virtual',
    icon: <Clock size={24} />, 
    name: 'Virtual Assistance', 
    count: 43, 
    color: 'bg-pink-100 text-pink-600',
    description: 'Remote administrative support, data entry, and customer service roles.'
  },
  { 
    id: 'agriculture',
    icon: <ArrowRight size={24} />, 
    name: 'Agriculture', 
    count: 32, 
    color: 'bg-teal-100 text-teal-600',
    description: 'Farming assistance, agricultural research, and food production opportunities.'
  }
];

interface GhanaJobCategoriesProps {
  limit?: number;
  showViewAll?: boolean;
}

const GhanaJobCategories: React.FC<GhanaJobCategoriesProps> = ({ limit, showViewAll = true }) => {
  const displayedCategories = limit ? ghanaJobCategories.slice(0, limit) : ghanaJobCategories;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Popular Categories in Ghana</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find opportunities that match your skills and interests across Ghana's growing industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{category.name}</h3>
                <p className="text-gray-500">{category.count} opportunities</p>
              </div>
            </div>
          ))}
        </div>

        {showViewAll && limit && ghanaJobCategories.length > limit && (
          <div className="text-center mt-10">
            <Link 
              to="/categories" 
              className="inline-flex items-center px-6 py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default GhanaJobCategories;
