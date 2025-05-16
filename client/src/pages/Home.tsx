import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { throttle as lodashThrottle } from "lodash";
import HeroSection from "../components/home/HeroSection";
import FeaturedTasks from "../components/home/FeaturedTasks";
import HiveCategories from "../components/home/HiveCategories";
import CallToAction from "../components/home/CallToAction";
import TestimonialsSection from "../components/home/TestimonialsSection";
import UniversityDirectory from "../components/universities/UniversityDirectory";
import GhanaJobCategories from "../components/jobs/GhanaJobCategories";
import GhanaPaymentMethods from "../components/payment/GhanaPaymentMethods";
import ScrollToTop from "../components/common/ScrollToTop";
// import PricingSection from "../components/home/PricingSection";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--cursor-x",
      `${cursorPosition.x}px`
    );
    document.documentElement.style.setProperty(
      "--cursor-y",
      `${cursorPosition.y}px`
    );
  }, [cursorPosition]);

  const handleMouseMove = useCallback(
    lodashThrottle((e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <motion.div 
      className="relative bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-60 cursor-light hidden md:block"
      />
      
      <motion.div 
        className="fixed top-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.15, 1],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative z-20 overflow-x-hidden">
        <HeroSection isAuthenticated={isAuthenticated} />

        <FeaturedTasks isAuthenticated={isAuthenticated} isScrolled={isScrolled} />

        <HiveCategories isAuthenticated={isAuthenticated} />

        <CallToAction isAuthenticated={isAuthenticated} />

        <TestimonialsSection />

        <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10">
          <motion.div 
            className="container mx-auto text-center px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <UniversityDirectory limit={4} showViewAll={true} />
          </motion.div>
        </section>

        <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white">
          <motion.div 
            className="container mx-auto text-center px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <GhanaJobCategories limit={8} showViewAll={true} />
          </motion.div>
        </section>

        {/* <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-gray-50">
          <PricingSection />
        </section> */}

        <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10">
          <motion.div 
            className="container mx-auto text-center px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <GhanaPaymentMethods showExample={true} />
          </motion.div>
        </section>
      </div>
      
      <div className="absolute inset-0 hexagon-pattern pointer-events-none opacity-40 z-0"></div>
      
      <ScrollToTop />
      
      <style>{`
        .min-h-screen {
          min-height: 100vh;
          overflow: visible;
        }

        html {
          scroll-behavior: smooth;
          height: auto;
          overflow-y: auto !important;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hexagon-pattern {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
          background-attachment: fixed;
        }

        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .smooth-scroll {
          will-change: transform;
          transform: translateZ(0);
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </motion.div>
  );
}

export default Home;
