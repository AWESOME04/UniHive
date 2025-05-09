import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingFeature {
  title: string;
  free: boolean;
  basic: boolean;
  premium: boolean;
}

const features: PricingFeature[] = [
  {
    title: "Create student profile",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Browse university directory",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "View hive tasks",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Quick task posting",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Intelligent category suggestions",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Personalized task feed",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "In-app communication",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Task completion tracking",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Community reputation system",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Featured task listings",
    free: false,
    basic: false,
    premium: true,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Choose the plan that works best for your university journey. Upgrade
            or downgrade anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-2">Free</h3>
              <p className="text-gray-500 mb-4">
                Get started with basic features
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-primary">GH₵0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Link
                to="/register"
                className="block w-full py-2 px-4 bg-gray-100 text-primary font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.free ? (
                      <Check
                        size={18}
                        className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-gray-300 mt-0.5 mr-2 flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        feature.free ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Basic Plan */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-secondary/20 relative z-10 transform md:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary"></div>
            <div className="p-6 border-b border-gray-100">
              <div className="bg-secondary/10 text-secondary text-xs font-bold uppercase py-1 px-2 rounded-full inline-block mb-3">
                Popular
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Basic</h3>
              <p className="text-gray-500 mb-4">
                Everything you need to succeed
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-primary">GH₵25</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Link
                to="/pricing"
                className="block w-full py-2 px-4 bg-secondary text-white font-medium rounded-lg text-center hover:bg-dark-orange transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.basic ? (
                      <Check
                        size={18}
                        className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-gray-300 mt-0.5 mr-2 flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        feature.basic ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-2">Premium</h3>
              <p className="text-gray-500 mb-4">
                Advanced features for professionals
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-primary">GH₵50</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Link
                to="/pricing"
                className="block w-full py-2 px-4 bg-gray-100 text-primary font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                Upgrade Now
              </Link>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.premium ? (
                      <Check
                        size={18}
                        className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-gray-300 mt-0.5 mr-2 flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        feature.premium ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/pricing"
            className="text-secondary font-medium hover:text-dark-orange transition-colors"
          >
            View full pricing details →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
