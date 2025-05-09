import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HiveCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  path: string;
}

const HiveCard: React.FC<HiveCardProps> = ({ name, description, icon, color, count, path }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-secondary/20 hover:shadow-md transition-all duration-200"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <div className={`${color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{count} listings</span>
          <Link
            to={path}
            className="inline-flex items-center text-secondary hover:text-secondary-dark text-sm font-medium transition-colors"
          >
            Explore
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HiveCard;
