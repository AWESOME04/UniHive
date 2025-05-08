import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookOpen, Briefcase, Package, Archive, Calendar, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import HiveCard from '../components/hives/HiveCard';

const Hives: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const hiveTypes = [
    {
      id: 'essentials',
      name: 'Essentials',
      description: 'Buy, sell, or exchange items like textbooks, electronics, and furniture.',
      icon: <Bookmark className="w-6 h-6" />,
      color: 'bg-red-500',
      count: 124,
      path: '/dashboard/hives/essentials'
    },
    {
      id: 'academia',
      name: 'Academia',
      description: 'Find tutors or offer tutoring services for various courses and subjects.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-500',
      count: 98,
      path: '/dashboard/hives/academia'
    },
    {
      id: 'logistics',
      name: 'Logistics',
      description: 'Request or offer delivery, pickup, and errand running services.',
      icon: <Package className="w-6 h-6" />,
      color: 'bg-green-500',
      count: 87,
      path: '/dashboard/hives/logistics'
    },
    {
      id: 'buzz',
      name: 'Buzz',
      description: 'Discover and share campus events, activities, and announcements.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-yellow-500',
      count: 73,
      path: '/dashboard/hives/buzz'
    },
    {
      id: 'archive',
      name: 'Archive',
      description: 'Access shared academic resources, study materials, and notes.',
      icon: <Archive className="w-6 h-6" />,
      color: 'bg-purple-500',
      count: 65,
      path: '/dashboard/hives/archive'
    },
    {
      id: 'sidehustle',
      name: 'Side Hustle',
      description: 'Find short-term gigs, part-time opportunities, and project work.',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-indigo-500',
      count: 112,
      path: '/dashboard/hives/sidehustle'
    }
  ];

  // Filter hives based on search query
  const filteredHives = searchQuery 
    ? hiveTypes.filter(hive => 
        hive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hive.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : hiveTypes;

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredHives.map((hive) => (
          <HiveCard 
            key={hive.id}
            id={hive.id}
            name={hive.name}
            description={hive.description}
            icon={hive.icon}
            color={hive.color}
            count={hive.count}
            path={hive.path}
          />
        ))}
      </motion.div>

      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Don't see what you're looking for?</h3>
            <p className="text-gray-600 mt-1">Create a new opportunity or request in any hive category.</p>
          </div>
          <Link
            to="/dashboard/hives/create"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Create New
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hives;
