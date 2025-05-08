import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HiveCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  path: string;
}

const HiveCard: React.FC<HiveCardProps> = ({
  name,
  description,
  icon,
  color,
  count,
  path
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${color} text-white`}>
            {icon}
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <div className="text-xs text-secondary">{count} listings</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <Link 
          to={path}
          className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
        >
          Explore {name}
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default HiveCard;
