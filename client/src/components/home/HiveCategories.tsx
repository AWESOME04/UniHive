import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Book,
  Truck,
  Megaphone,
  Archive,
  Briefcase,
  ChevronRight,
  Loader
} from "lucide-react";
import hivesService, { Hive, HiveType } from "../../services/hivesService";

import designSvg from '../../assets/design.svg';
import riceSvg from '../../assets/rice.svg';
import webDevSvg from '../../assets/web-dev.svg';
import calculusSvg from '../../assets/calculus.svg';
import lectureSvg from '../../assets/lecture.svg';
import photoSvg from '../../assets/photo.svg';
import logisticsSvg from '../../assets/logistics.svg';
import eventsSvg from '../../assets/events.svg';
import taskSvg from '../../assets/task.svg';
import { HiveCategory } from "../../types/hiveTypes";

interface HiveCategoriesProps {
  isAuthenticated: boolean;
}

// Define interface for filtered tasks
interface HiveTask {
  id: string;
  title: string;
  description: string;
  price: string | number;
  location?: string;
  hiveType: {
    id: string;
    name: string;
    icon: string;
  };
  // Add any other properties that might be used
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  postedBy?: {
    name: string;
    avatar?: string;
  };
}

const HiveCategories = ({ isAuthenticated }: HiveCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hiveCategories, setHiveCategories] = useState<HiveCategory[]>([]);
  const [hiveTasks, setHiveTasks] = useState<Hive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get icon component based on icon name from API
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shopping-bag':
        return <ShoppingBag size={20} className="text-secondary" />;
      case 'book':
        return <Book size={20} className="text-secondary" />;
      case 'truck':
        return <Truck size={20} className="text-secondary" />;
      case 'megaphone':
        return <Megaphone size={20} className="text-secondary" />;
      case 'archive':
        return <Archive size={20} className="text-secondary" />;
      case 'briefcase':
        return <Briefcase size={20} className="text-secondary" />;
      default:
        return <Star size={20} className="text-secondary" />;
    }
  };

  // Get SVG image based on task title or type
  const getTaskImage = (title: string, hiveType: string) => {
    if (title.toLowerCase().includes('logo') || title.toLowerCase().includes('design')) {
      return designSvg;
    } else if (title.toLowerCase().includes('rice cooker')) {
      return riceSvg;
    } else if (title.toLowerCase().includes('tech') || title.toLowerCase().includes('website')) {
      return webDevSvg;
    } else if (title.toLowerCase().includes('calculus') || title.toLowerCase().includes('math')) {
      return calculusSvg;
    } else if (title.toLowerCase().includes('lecture') || title.toLowerCase().includes('study')) {
      return lectureSvg;
    } else if (title.toLowerCase().includes('photo')) {
      return photoSvg;
    }
    
    // Default based on hive type
    switch (hiveType) {
      case 'Essentials':
        return riceSvg;
      case 'Academia':
        return calculusSvg;
      case 'Logistics':
        return logisticsSvg;
      case 'Buzz':
        return eventsSvg;
      case 'Archive':
        return lectureSvg;
      case 'SideHustle':
        return designSvg;
      default:
        return taskSvg;
    }
  };

  // Fetch hives data from API
  useEffect(() => {
    const fetchHives = async () => {
      try {
        setLoading(true);
        const response = await hivesService.getHives();

        const hiveTypeMap = new Map<string, { type: HiveType; count: number }>();
        
        response.data.forEach((hive: HiveTask) => {
          if (!hiveTypeMap.has(hive.hiveType.id)) {
            hiveTypeMap.set(hive.hiveType.id, { 
              type: hive.hiveType, 
              count: 1 
            });
          } else {
            const existing = hiveTypeMap.get(hive.hiveType.id);
            if (existing) {
              existing.count += 1;
            }
          }
        });
        
        // Convert map to array of categories
        const categories: HiveCategory[] = Array.from(hiveTypeMap.values()).map(({ type, count }) => ({
          id: type.id,
          name: type.name,
          icon: getIconComponent(type.icon),
          count,
          description: type.description || `Explore ${type.name} hives` // Provide default value
        }));
        
        // Add "All" category
        const totalCount = response.data.length;
        categories.unshift({
          id: 'all',
          name: 'All',
          icon: <Star size={20} className="text-secondary" />,
          count: totalCount,
          description: 'View all Hives'
        });
        
        setHiveCategories(categories);
        setHiveTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load hives. Please try again later.');
        setLoading(false);
        console.error('Error fetching hives:', err);
      }
    };

    fetchHives();
  }, []);

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

  // Filter tasks based on selected category
  const filteredTasks = activeCategory === "All" 
    ? hiveTasks 
    : hiveTasks.filter(task => task.hiveType.name === activeCategory);

  // Type-safe function to format price
  const formatPrice = (price: string | number | undefined): string => {
    if (price === undefined || price === null) {
      return "Free";
    }
    
    if (typeof price === "number") {
      return `₵${price.toFixed(2)}`;
    }
    
    if (typeof price === "string") {
      const numPrice = parseFloat(price);
      if (!isNaN(numPrice)) {
        return `₵${numPrice.toFixed(2)}`;
      }
      return price.startsWith("₵") ? price : `₵${price}`;
    }
    
    return "Free";
  };

  return (
    <motion.section 
      className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10 overflow-hidden w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto overflow-hidden px-0">
        <motion.div 
          className="text-center mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Browse by Hive
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-1">
            Explore opportunities across various Hives tailored to university
            students' needs
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader size={32} className="animate-spin text-secondary" />
            <span className="ml-2 text-gray-600">Loading hives...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-center text-red-600">
            {error}
          </div>
        ) : (
          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tabs for categories with animation */}
            <motion.div 
              className="flex overflow-x-auto scrollbar-hide mb-4 sm:mb-8 pb-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {hiveCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center whitespace-nowrap min-w-max px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg mr-2 sm:mr-3 transition-colors ${
                    activeCategory === category.name
                      ? "bg-secondary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center mr-1.5 sm:mr-2">
                    {category.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Description for selected category */}
            <AnimatePresence mode="wait">
              {activeCategory !== "All" && (
                <motion.div 
                  className="mb-4 sm:mb-8 p-3 sm:p-4 bg-light-orange/10 rounded-lg"
                  key={activeCategory}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                    {activeCategory} Hive
                  </h3>
                  <p className="text-xs text-gray-500">
                    {
                      hiveCategories.find((cat) => cat.name === activeCategory)
                        ?.description
                    }
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tasks grid with animation */}
            <motion.div 
              className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredTasks.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No tasks available in this category.
                </div>
              ) : (
                filteredTasks.map((hive: HiveTask) => (
                  <motion.div
                    key={hive.id}
                    className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-secondary/20"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -2 }}
                    layout
                  >
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <motion.div 
                        className="flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <img 
                          src={getTaskImage(hive.title, hive.hiveType.name)} 
                          alt={hive.title} 
                          className="w-8 h-8"
                        />
                      </motion.div>
                      <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {formatPrice(hive.price)}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold mb-1 line-clamp-1">
                      {hive.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                      {hive.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="bg-secondary/10 text-secondary text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                        {hive.hiveType.name}
                      </span>

                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link
                          to={isAuthenticated ? `/tasks/${hive.id}` : "/login"}
                          className="text-secondary flex items-center text-xs hover:underline"
                        >
                          {isAuthenticated ? "View details" : "Login to view"}
                          <ChevronRight size={12} className="ml-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default HiveCategories;
