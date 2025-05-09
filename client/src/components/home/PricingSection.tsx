import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PricingSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the plan that best fits your needs
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-2">Basic</h3>
          <p className="text-gray-600 mb-4">Perfect for getting started</p>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold">Free</span>
            <span className="text-gray-500 ml-2">forever</span>
          </div>
          <button className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Current Plan
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 border-2 border-secondary"
        >
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-gray-600 mb-4">For power users who need more</p>
          <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold">GH₵20</span>
            <span className="text-gray-500 ml-2">/month</span>
          </div>
          <button className="w-full py-3 px-6 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
            Coming Soon
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link 
          to="/pricing" 
          className="inline-flex items-center text-secondary hover:text-secondary/80"
        >
          View full comparison
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </motion.div>
    </div>
  );
};

export default PricingSection;
