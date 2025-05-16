import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  showOffset?: number;
  bottom?: number;
  right?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  showOffset = 300, 
  bottom = 30, 
  right = 30 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user has scrolled down to specified offset
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showOffset]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed z-50 bg-secondary text-white rounded-full shadow-lg hover:bg-dark-orange p-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
          style={{ bottom: `${bottom}px`, right: `${right}px` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
