import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  GraduationCap,
  Truck,
  Radio,
  Archive,
  Briefcase,
  ChevronRight
} from "lucide-react";

interface HiveCategoriesProps {
  isAuthenticated: boolean;
}

const HiveCategories = ({ isAuthenticated }: HiveCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Categories renamed to Hives with the requested categories
  const hiveCategories = [
    {
      name: "All",
      icon: <Star size={20} className="text-secondary" />,
      count: 642,
      description: "View all Hives",
    },
    {
      name: "Essentials",
      icon: <ShoppingBag size={20} className="text-secondary" />,
      count: 125,
      description:
        "Used items like rice cookers, electric stoves, shoes, books, etc.",
    },
    {
      name: "Academia",
      icon: <GraduationCap size={20} className="text-secondary" />,
      count: 105,
      description: "Tutoring, mentoring, peer teaching, group studies",
    },
    {
      name: "Logistics",
      icon: <Truck size={20} className="text-secondary" />,
      count: 86,
      description: "Delivery requests, pick-ups, laundry runs, etc.",
    },
    {
      name: "Buzz",
      icon: <Radio size={20} className="text-secondary" />,
      count: 94,
      description: "Student businesses, event listings, club activities",
    },
    {
      name: "Archive",
      icon: <Archive size={20} className="text-secondary" />,
      count: 78,
      description: "Lecture notes, past questions, resources, templates",
    },
    {
      name: "SideHustle",
      icon: <Briefcase size={20} className="text-secondary" />,
      count: 112,
      description: "Side gigs, freelance tasks, part-time work",
    },
  ];

  // Featured tasks with more details
  const featuredTasks = [
    {
      title: "Photography",
      description: "Wedding photographer needed",
      price: "₵250",
      icon: "📸",
      hive: "SideHustle",
    },
    {
      title: "Design",
      description: "Create a high converting landing page",
      price: "₵100",
      icon: "🎨",
      hive: "SideHustle",
    },
    {
      title: "Rice Cooker",
      description: "Slightly used rice cooker in good condition",
      price: "₵40",
      icon: "🍚",
      hive: "Essentials",
    },
    {
      title: "Web Development",
      description: "Build a responsive website",
      price: "₵500",
      icon: "🖥️",
      hive: "SideHustle",
    },
    {
      title: "Calculus Tutor",
      description: "Need help with Calculus II assignments",
      price: "₵80",
      icon: "📊",
      hive: "Academia",
    },
    {
      title: "Lecture Notes",
      description: "Complete Engineering Physics notes available",
      price: "₵30",
      icon: "📝",
      hive: "Archive",
    },
    {
      title: "Campus Event",
      description: "Seeking DJ for upcoming student mixer",
      price: "₵200",
      icon: "🎵",
      hive: "Buzz",
    },
    {
      title: "Package Pickup",
      description: "Need someone to pick up package from post office",
      price: "₵20",
      icon: "📦",
      hive: "Logistics",
    },
  ];

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
    <motion.section 
      className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-0">
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
                key={category.name}
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
                  {typeof category.icon === "object" ? (
                    category.icon
                  ) : (
                    <span className="text-secondary">{category.icon}</span>
                  )}
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
            {featuredTasks
              .filter(
                (task) =>
                  activeCategory === "All" || task.hive === activeCategory
              )
              .map((task, index) => (
                <motion.div
                  key={`${task.title}-${index}`}
                  className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-secondary/20"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -2 }}
                  layout
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <motion.div 
                      className="text-xl sm:text-2xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {task.icon}
                    </motion.div>
                    <div className="bg-light-orange/80 text-secondary px-2 py-0.5 rounded-full text-xs font-medium">
                      {task.price}
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="bg-secondary/10 text-secondary text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                      {task.hive}
                    </span>

                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        to={isAuthenticated ? "/dashboard/search" : "/login"}
                        className="text-secondary flex items-center text-xs hover:underline"
                      >
                        {isAuthenticated ? "View details" : "Login to view"}
                        <ChevronRight size={12} className="ml-1" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HiveCategories;
