import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";

interface FeaturedTasksProps {
  isAuthenticated: boolean;
  isScrolled: boolean;
}

const FeaturedTasks = ({ isAuthenticated, isScrolled }: FeaturedTasksProps) => {
  // Featured tasks data - using SVG icons
  const featuredTasks = [
    {
      title: "Photography",
      description: "Wedding photographer needed",
      price: "₵250",
      icon: <img src="/src/assets/photo.svg" alt="Photography" className="w-8 h-8" />,
      hive: "SideHustle",
    },
    {
      title: "Design",
      description: "Create a high converting landing page",
      price: "₵100",
      icon: <img src="/src/assets/design.svg" alt="Design" className="w-8 h-8" />,
      hive: "SideHustle",
    },
    {
      title: "Rice Cooker",
      description: "Slightly used rice cooker in good condition",
      price: "₵40",
      icon: <img src="/src/assets/rice.svg" alt="Rice Cooker" className="w-8 h-8" />,
      hive: "Essentials",
    },
    {
      title: "Web Development",
      description: "Build a responsive website",
      price: "₵500",
      icon: <img src="/src/assets/web-dev.svg" alt="Web Development" className="w-8 h-8" />,
      hive: "SideHustle",
    },
    {
      title: "Calculus Tutor",
      description: "Need help with Calculus II assignments",
      price: "₵80",
      icon: <img src="/src/assets/calculus.svg" alt="Calculus" className="w-8 h-8" />,
      hive: "Academia",
    },
    {
      title: "Lecture Notes",
      description: "Complete Engineering Physics notes available",
      price: "₵30",
      icon: <img src="/src/assets/lecture.svg" alt="Lecture Notes" className="w-8 h-8" />,
      hive: "Archive",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className={`py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white transition-all duration-700`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7 } 
      }}
      style={{
        transform: isScrolled ? "translateY(0)" : "translateY(10px)",
        opacity: isScrolled ? 1 : 0.95
      }}
    >
      <div className="container mx-auto px-0">
        <motion.div 
          className="text-center mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center mb-2 sm:mb-4 px-2 sm:px-3 py-1 bg-secondary/10 rounded-full text-xs sm:text-sm">
            <Zap size={14} className="text-secondary mr-1 sm:mr-2" />
            <span className="font-medium">Popular right now</span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Featured Tasks
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-1">
            Discover the most popular tasks from our community
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredTasks.map((task, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-secondary/20"
              variants={taskVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between items-start mb-3 sm:mb-5">
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {task.icon}
                </motion.div>
                <div className="bg-light-orange text-secondary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                  {task.price}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold">
                  {task.title}
                </h3>
                <span className="bg-secondary/10 text-secondary text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  {task.hive}
                </span>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
                {task.description}
              </p>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  to={isAuthenticated ? "/dashboard/search" : "/login"}
                  className="text-secondary flex items-center text-xs sm:text-sm hover:underline"
                >
                  {isAuthenticated ? "View details" : "Login to apply"}{" "}
                  <ChevronRight size={12} className="ml-1" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedTasks;
