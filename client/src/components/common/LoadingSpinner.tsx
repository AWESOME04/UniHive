import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = "#F6A93B" // Secondary color
}) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="rounded-full border-4 border-t-transparent"
        style={{ 
          width: size, 
          height: size, 
          borderColor: color,
          borderTopColor: 'transparent'
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
