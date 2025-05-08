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
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="pointer-events-none fixed inset-0 z-10 opacity-60 cursor-light hidden md:block"
      />
      
      <motion.div 
        className="absolute top-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl"
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
      
      <div className="fixed inset-0 hexagon-pattern pointer-events-none opacity-40 z-0"></div>
      
      {/* Animation styles */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hexagon-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23F6A93B' fill-opacity='0.05' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </motion.div>
  );
}

export default Home;
