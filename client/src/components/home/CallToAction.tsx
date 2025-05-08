import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CallToActionProps {
  isAuthenticated: boolean;
}

const CallToAction = ({ isAuthenticated }: CallToActionProps) => {
  return (
    <motion.section 
      className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-gradient-to-br from-secondary to-accent-orange"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center px-0">
        <motion.h2 
          className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to join the Hive?
        </motion.h2>
        
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-white/90 mb-5 sm:mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Connect with other students, find opportunities, and make the most
          of your university experience on UniHive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isAuthenticated ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-secondary rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-secondary rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
                >
                  Join UniHive
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white/20 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/30 transition-colors"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-16 w-72 h-72 bg-white opacity-10 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.section>
  );
};

export default CallToAction;
