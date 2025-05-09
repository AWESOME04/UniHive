import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  basic: boolean;
  pro: boolean;
}

const features: Feature[] = [
  {
    title: "Basic Listings",
    description: "Post and manage basic hive listings across all categories",
    basic: true,
    pro: true
  },
  {
    title: "Priority Support",
    description: "Get priority customer support and faster response times",
    basic: false,
    pro: true
  },
  {
    title: "Featured Listings",
    description: "Your listings appear at the top of search results",
    basic: false,
    pro: true
  },
  {
    title: "Advanced Analytics",
    description: "Detailed insights about your listings and interactions",
    basic: false,
    pro: true
  },
  {
    title: "Instant Messaging",
    description: "Real-time chat with other users",
    basic: true,
    pro: true
  },
  {
    title: "File Sharing",
    description: "Share documents and files with other users",
    basic: true,
    pro: true
  }
];

const Pricing: React.FC = () => {
  const [activeDescription, setActiveDescription] = useState<string | null>(null);

  const toggleFeatureDescription = (title: string) => {
    if (activeDescription === title) {
      setActiveDescription(null);
    } else {
      setActiveDescription(title);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-gray-600 mb-6">Everything you need to get started</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">Free</span>
                <span className="text-gray-500 ml-2">forever</span>
              </div>
              <button className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Current Plan
              </button>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-secondary"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">For power users who need more</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">GH₵20</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <button className="w-full py-3 px-6 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                Coming Soon
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">Features Comparison</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {features.map((feature) => (
              <div key={feature.title} className="grid grid-cols-12 items-center">
                <div className="col-span-6 p-4 relative">
                  <div className="flex items-center">
                    <span>{feature.title}</span>
                    <button
                      onClick={() => toggleFeatureDescription(feature.title)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                  {activeDescription === feature.title && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 w-64"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </div>
                <div className="col-span-3 p-4 flex justify-center items-center bg-secondary/5">
                  {feature.basic ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-red-500" />
                  )}
                </div>
                <div className="col-span-3 p-4 flex justify-center items-center">
                  {feature.pro ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          {/* Add FAQ content here */}
        </div>
      </div>
    </div>
  );
};

export default Pricing;