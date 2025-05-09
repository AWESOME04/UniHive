import { useEffect, useState } from "react";
import { throttle as lodashThrottle } from "lodash";
import HeroSection from "../components/home/HeroSection";
import FeaturedTasks from "../components/home/FeaturedTasks";
import HiveCategories from "../components/home/HiveCategories";
import CallToAction from "../components/home/CallToAction";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PricingSection from "../components/home/PricingSection";
import UniversityDirectory from "../components/universities/UniversityDirectory";
import GhanaJobCategories from "../components/jobs/GhanaJobCategories";
import GhanaPaymentMethods from "../components/payment/GhanaPaymentMethods";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    // Optimized scroll handler with passive flag and throttling
    const handleScroll = lodashThrottle(() => {
      if (window.scrollY > 50) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    }, 100);

    // Use passive true for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <div className="min-h-screen bg-background relative w-full">
      {/* Static background elements instead of animated ones */}
      <div className="absolute top-0 -right-10 w-40 sm:w-72 h-40 sm:h-72 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl" />
      <div className="absolute bottom-0 -left-10 w-40 sm:w-80 h-40 sm:h-80 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl" />
      <div className="absolute top-1/3 -right-20 w-52 sm:w-96 h-52 sm:h-96 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl" />

      <HeroSection isAuthenticated={isAuthenticated} />

      <FeaturedTasks
        isAuthenticated={isAuthenticated}
        isScrolled={isScrolled}
      />

      <HiveCategories isAuthenticated={isAuthenticated} />

      <CallToAction isAuthenticated={isAuthenticated} />

      <TestimonialsSection />

      <PricingSection />

      <section className="py-6 sm:py-16 md:py-20 bg-light-orange/10 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto text-center px-3 sm:px-4 md:px-8 lg:px-12">
          <UniversityDirectory limit={4} showViewAll={true} />
        </div>
      </section>

      <section className="py-6 sm:py-16 md:py-20 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto text-center px-3 sm:px-4 md:px-8 lg:px-12">
          <GhanaJobCategories limit={8} showViewAll={true} />
        </div>
      </section>

      <section className="py-6 sm:py-16 md:py-20 bg-light-orange/10 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto text-center px-3 sm:px-4 md:px-8 lg:px-12">
          <GhanaPaymentMethods showExample={true} />
        </div>
      </section>

      <div className="fixed inset-0 hexagon-pattern pointer-events-none opacity-40 z-0"></div>
    </div>
  );
}

export default Home;
