import React from 'react';
import { motion } from 'framer-motion';
import { HiveCategory } from '../../types/hiveTypes';

interface HiveCategoryListProps {
  categories: HiveCategory[];
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

const HiveCategoryList: React.FC<HiveCategoryListProps> = ({ 
  categories, 
  onCategorySelect, 
  selectedCategory = 'All'
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold mb-4">Hive Categories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer border-l-4 transition-colors ${
              selectedCategory === category.name
                ? "border-secondary"
                : "border-transparent"
            } hover:border-secondary/50`}
            onClick={() => onCategorySelect && onCategorySelect(category.name)}
            variants={itemVariants}
            whileHover={{ y: -3 }}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">{category.icon}</div>
              <div>
                <h4 className="font-medium">{category.name}</h4>
                <p className="text-xs text-gray-500">{category.count} listings</p>
                {category.description && (
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HiveCategoryList;
