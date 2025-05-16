import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  ArrowRight,
  Laptop,
  CirclePlus,
  Trophy,
  Briefcase,
  Lightbulb,
  Clock,
} from "lucide-react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative pt-8 sm:pt-16 md:pt-20 pb-10 sm:pb-16 md:pb-24 px-3 sm:px-4 md:px-8 lg:px-12 bg-gradient-to-br from-background via-white to-light-orange/20 overflow-hidden">
      {/* Floating Elements with Framer Motion */}
      <motion.div 
        className="absolute top-20 left-1/4 w-12 h-12 bg-light-orange rounded-lg hidden lg:block" 
        initial={{ rotate: 0 }}
        animate={{ rotate: 12, y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-40 right-1/4 w-8 h-8 bg-secondary opacity-50 rounded-full hidden lg:block" 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1, y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-6 h-6 bg-accent-purple opacity-40 rounded-md hidden lg:block" 
        initial={{ rotate: 0 }}
        animate={{ rotate: -12, y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-between">
          <motion.div 
            className="flex-1 max-w-full sm:max-w-xl lg:max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center mb-3 sm:mb-6 px-3 py-1.5 sm:py-2 bg-light-orange/20 rounded-full text-xs sm:text-sm"
              variants={childVariants}
            >
              <Sparkles size={16} className="text-secondary mr-2" />
              <span className="font-medium">
                Find the best student gigs in Ghana
              </span>
            </motion.div>

            <motion.h1 
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-tight tracking-tight"
              variants={childVariants}
            >
              Connect, Collaborate &amp;{" "}
              <span className="text-secondary">Earn</span> as a University
              Student
            </motion.h1>

            <motion.p 
              className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-8 leading-relaxed"
              variants={childVariants}
            >
              UniHive connects Ghanaian university students with side hustles,
              internships, and freelance opportunities tailored to your skills
              and academic schedule.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10"
              variants={childVariants}
            >
              {isAuthenticated ? (
                // Show these buttons for authenticated users
                <>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/dashboard"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <Laptop size={18} className="mr-2" />
                      <span>Go to Dashboard</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/dashboard/add-job"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <CirclePlus size={18} className="mr-2" />
                      <span>Post a Job</span>
                    </Link>
                  </motion.div>
                </>
              ) : (
                // Show these buttons for non-authenticated users
                <>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/register"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <Users size={18} className="mr-2" />
                      <span>Join UniHive</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/login"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <ArrowRight size={18} className="mr-2" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-2 sm:gap-3"
              variants={childVariants}
            >
              <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                <Trophy size={14} className="text-secondary mr-1" />
                <span>20,000+ Students</span>
              </div>
              <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                <Briefcase size={14} className="text-secondary mr-1" />
                <span>5,000+ Jobs</span>
              </div>
              <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                <Lightbulb size={14} className="text-secondary mr-1" />
                <span>500+ Employers</span>
              </div>
              <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                <Clock size={14} className="text-secondary mr-1" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full mt-6 lg:mt-0 max-w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-br from-secondary to-accent-purple">
              <div className="absolute inset-0 bg-white rounded-xl opacity-90"></div>
              <div className="relative bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
                  Explore Top Hives
                </h2>
                
                <motion.div 
                  className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { 
                      name: "Essentials", 
                      icon: "🛒", 
                      count: 125, 
                      desc: "Used items like rice cookers, electric stoves, etc."
                    },
                    { 
                      name: "Academia", 
                      icon: "📚", 
                      count: 105, 
                      desc: "Tutoring, mentoring, peer teaching, group studies"
                    },
                    { 
                      name: "Logistics", 
                      icon: "🚚", 
                      count: 86, 
                      desc: "Delivery requests, pick-ups, laundry runs, etc."
                    },
                    { 
                      name: "SideHustle", 
                      icon: "💼", 
                      count: 112, 
                      desc: "Side gigs, freelance tasks, part-time work"
                    }
                  ].map((category) => (
                    <motion.div
                      key={category.name}
                      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-light-orange/20 transition-all duration-300 cursor-pointer"
                      variants={childVariants}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light-orange flex items-center justify-center text-xl">
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          {category.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {category.count}+ tasks
                        </p>
                        <p className="text-xs text-gray-500 hidden sm:block">
                          {category.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t"
                  variants={childVariants}
                >
                  <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Popular Universities
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
                      <motion.div 
                        className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <img src="/universityofghana.png" alt="University of Ghana" className="h-6 w-6 object-contain mr-2" />
                        <span className="text-xs font-medium">University of Ghana</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <img src="/kwame-nkrumah-university-of-scie.png" alt="KNUST" className="h-6 w-6 object-contain mr-2" />
                        <span className="text-xs font-medium">KNUST</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <img src="/ucc.png" alt="UCC" className="h-6 w-6 object-contain mr-2" />
                        <span className="text-xs font-medium">UCC</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <img src="/central.png" alt="Central University" className="h-6 w-6 object-contain mr-2" />
                        <span className="text-xs font-medium">Central</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
