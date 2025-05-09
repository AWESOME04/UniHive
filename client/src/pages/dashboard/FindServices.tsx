import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, Clock, ArrowUpRight } from 'lucide-react';

const FindServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'academic', name: 'Academic' },
    { id: 'technical', name: 'Technical' },
    { id: 'creative', name: 'Creative' },
    { id: 'lifestyle', name: 'Lifestyle' },
  ];

  const mockServices = [
    {
      id: 1,
      title: "Mathematics Tutoring",
      category: "academic",
      price: "₵50/hr",
      rating: 4.8,
      reviews: 24,
      location: "Virtual",
      postedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "UI/UX Design Services",
      category: "creative",
      price: "₵300",
      rating: 4.5,
      reviews: 18,
      location: "Remote",
      postedAt: "1 day ago"
    },
    {
      id: 3,
      title: "Web Development",
      category: "technical",
      price: "₵100/hr",
      rating: 4.7,
      reviews: 32,
      location: "On-site",
      postedAt: "3 days ago"
    },
    {
      id: 4,
      title: "Fitness Coaching",
      category: "lifestyle",
      price: "₵80/hr",
      rating: 4.6,
      reviews: 12,
      location: "Campus Gym",
      postedAt: "1 week ago"
    },
    {
      id: 5,
      title: "Content Writing",
      category: "creative",
      price: "₵200/article",
      rating: 4.9,
      reviews: 15,
      location: "Remote",
      postedAt: "2 days ago"
    },
    {
      id: 6,
      title: "Graphic Design",
      category: "creative",
      price: "₵150/project",
      rating: 4.4,
      reviews: 10,
      location: "Virtual",
      postedAt: "1 week ago"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Find Services</h1>
          <p className="text-gray-600 mt-1">Discover and connect with student service providers</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs">
                    {service.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-900 font-bold">{service.price}</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-1 text-sm text-gray-600">
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {service.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {service.postedAt}
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center font-medium hover:bg-secondary/20 transition-colors">
                  View Details
                  <ArrowUpRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindServices;
