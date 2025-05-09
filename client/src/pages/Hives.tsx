import React, { useState } from 'react';
import { Briefcase, Book, Truck, Bell, Archive, Layers, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HiveCard from '../components/hives/HiveCard';
import { HiveCategory } from '../types/hiveTypes';
import FeedbackModal from '../components/modals/FeedbackModal';

const Hives: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Define the hive categories with proper typing
  const hiveCategories: HiveCategory[] = [
    {
      id: 'essentials',
      name: 'Essentials',
      icon: <Briefcase className="w-6 h-6" />,
      count: 125,
      description: "Buy and sell essential items like textbooks, electronics, and furniture",
      path: '/dashboard/hives/essentials',
      color: 'bg-blue-500'
    },
    {
      id: 'academia',
      name: 'Academia',
      icon: <Book className="w-6 h-6" />,
      count: 105,
      description: "Find tutors or offer teaching services in various subjects",
      path: '/dashboard/hives/academia',
      color: 'bg-green-500'
    },
    {
      id: 'logistics',
      name: 'Logistics',
      icon: <Truck className="w-6 h-6" />,
      count: 86,
      description: "Request or offer delivery, pickups, and other logistical services",
      path: '/dashboard/hives/logistics',
      color: 'bg-yellow-500'
    },
    {
      id: 'buzz',
      name: 'Buzz',
      icon: <Bell className="w-6 h-6" />,
      count: 112,
      description: "Discover campus events, activities, and announcements",
      path: '/dashboard/hives/buzz',
      color: 'bg-red-500'
    },
    {
      id: 'archive',
      name: 'Archive',
      icon: <Archive className="w-6 h-6" />,
      count: 94,
      description: "Access and share study materials, notes, and academic resources",
      path: '/dashboard/hives/archive',
      color: 'bg-purple-500'
    },
    {
      id: 'sidehustle',
      name: 'SideHustle',
      icon: <Layers className="w-6 h-6" />,
      count: 138,
      description: "Find and offer gigs, part-time work, and freelance opportunities",
      path: '/dashboard/hives/sidehustle',
      color: 'bg-indigo-500'
    },
  ];

  // Filter hives based on search query
  const filteredHives = searchQuery 
    ? hiveCategories.filter(hive => 
        hive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hive.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : hiveCategories;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hives</h1>
          <p className="text-gray-600 mt-1">
            Explore different types of services and opportunities within your university community
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search hives..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredHives.map((hive) => (
          <HiveCard 
            key={hive.id}
            id={hive.id}
            name={hive.name}
            description={hive.description} // description is now required so it can't be undefined
            icon={hive.icon}
            color={hive.color || 'bg-secondary'}
            count={hive.count}
            path={hive.path || `/dashboard/hives/${hive.id}`}
          />
        ))}
      </motion.div>

      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Don't see what you're looking for?</h3>
            <p className="text-gray-600 mt-1">Create a new opportunity or request in any hive category.</p>
          </div>
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Create New
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};

export default Hives;
