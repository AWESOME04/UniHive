import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import notFoundImg from '../assets/404.svg'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div 
        className="max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto mb-8"
        >
          <img 
            src={notFoundImg}
            alt="404 Illustration" 
            className="w-full h-auto"
          />
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          It seems like you've wandered into uncharted territory. 
          Let's get you back on track!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
