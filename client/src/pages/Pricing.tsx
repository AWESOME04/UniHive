import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingFeature {
  title: string;
  description: string;
  free: boolean;
  basic: boolean;
  premium: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const features: PricingFeature[] = [
  {
    title: "Create student profile",
    description:
      "Build your academic and professional profile to showcase your skills and experience.",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Browse university directory",
    description:
      "Explore universities across Ghana and access basic information about programs and facilities.",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "View hive tasks",
    description:
      "Browse available tasks posted by students and university community members.",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Quick task posting",
    description:
      "Create and publish tasks in minutes with our streamlined posting process.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Intelligent category suggestions",
    description:
      "Get AI-powered category recommendations based on your task description.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Personalized task feed",
    description:
      "Receive customized task recommendations based on your skills, interests, and past activity.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "In-app communication",
    description:
      "Connect directly with task posters or applicants through our secure messaging system.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Task completion tracking",
    description:
      "Monitor the progress of your tasks with our seamless completion flow and payment system.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Community reputation system",
    description:
      "Build your reputation within the university community through ratings and reviews.",
    free: true,
    basic: true,
    premium: true,
  },
  {
    title: "Featured task listings",
    description: "Get your tasks highlighted at the top of search results and category pages.",
    free: false,
    basic: false,
    premium: true,
  },
  {
    title: "Task analytics",
    description: "Access detailed insights about your task performance and applicant demographics.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Priority support",
    description:
      "Get faster responses from our support team with dedicated priority channels.",
    free: false,
    basic: true,
    premium: true,
  },
  {
    title: "Advanced filters",
    description:
      "Use powerful search filters to find exactly the tasks or helpers you need.",
    free: false,
    basic: false,
    premium: true,
  },
  {
    title: "Verified badge",
    description: "Earn a verified badge to show you're a trusted community member.",
    free: false,
    basic: false,
    premium: true,
  },
  {
    title: "Unlimited task postings",
    description: "Post as many tasks as you want without monthly limits.",
    free: false,
    basic: false,
    premium: true,
  },
];

const faqs: FAQ[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes! Students with a valid university email address receive a 20% discount on Basic and Premium plans.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for both Basic and Premium plans. No credit card required to start your trial.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept mobile money payments (MTN, AirtelTigo, Telecel), credit/debit cards, and bank transfers.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees! The price you see is what you pay, and we'll always notify you before any changes to our pricing structure.",
  },
];

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const toggleFeatureDescription = (title: string) => {
    if (activeFeature === title) {
      setActiveFeature(null);
    } else {
      setActiveFeature(title);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-light-orange/10 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Find the Perfect Plan for Your University Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're just starting out or looking to advance your
              career, we have a plan that fits your needs and budget.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg mb-8">
              <button
                className={`py-2 px-4 rounded-md ${
                  billingPeriod === "monthly"
                    ? "bg-white shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  billingPeriod === "yearly"
                    ? "bg-white shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly{" "}
                <span className="text-xs text-green-500 font-medium">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
                <p className="text-gray-500 mb-6">
                  Perfect for exploring the platform
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold text-primary">GH₵0</span>
                  <span className="text-gray-500 ml-2">/forever</span>
                </div>
                <Link
                  to="/register"
                  className="block w-full py-3 px-4 bg-gray-100 text-primary font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
                >
                  Sign Up Free
                </Link>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-4">
                  {features
                    .filter((f) => f.free)
                    .slice(0, 6)
                    .map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          size={18}
                          className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <span className="text-gray-700">{feature.title}</span>
                      </li>
                    ))}
                  {features
                    .filter((f) => !f.free)
                    .slice(0, 3)
                    .map((feature, index) => (
                      <li key={index} className="flex items-start opacity-50">
                        <X
                          size={18}
                          className="text-gray-300 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <span className="text-gray-400">{feature.title}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>

            {/* Basic Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-secondary/20 relative z-10 transform md:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary"></div>
              <div className="p-6 border-b border-gray-100">
                <div className="bg-secondary/10 text-secondary text-xs font-bold uppercase py-1 px-2 rounded-full inline-block mb-3">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Basic</h3>
                <p className="text-gray-500 mb-6">
                  Everything you need to succeed
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold text-primary">
                    {billingPeriod === "monthly" ? "GH₵25" : "GH₵20"}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /
                    {billingPeriod === "monthly"
                      ? "month"
                      : "month, billed annually"}
                  </span>
                </div>
                <Link
                  to="/register?plan=basic"
                  className="block w-full py-3 px-4 bg-secondary text-white font-medium rounded-lg text-center hover:bg-dark-orange transition-colors"
                >
                  Get Started
                </Link>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  Everything in Free, plus:
                </h4>
                <ul className="space-y-4">
                  {features
                    .filter((f) => f.basic && !f.free)
                    .slice(0, 6)
                    .map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          size={18}
                          className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <span className="text-gray-700">{feature.title}</span>
                      </li>
                    ))}
                  {features
                    .filter((f) => !f.basic)
                    .slice(0, 3)
                    .map((feature, index) => (
                      <li key={index} className="flex items-start opacity-50">
                        <X
                          size={18}
                          className="text-gray-300 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <span className="text-gray-400">{feature.title}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Premium
                </h3>
                <p className="text-gray-500 mb-6">
                  Advanced features for professionals
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold text-primary">
                    {billingPeriod === "monthly" ? "GH₵50" : "GH₵40"}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /
                    {billingPeriod === "monthly"
                      ? "month"
                      : "month, billed annually"}
                  </span>
                </div>
                <Link
                  to="/register?plan=premium"
                  className="block w-full py-3 px-4 bg-gray-100 text-primary font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  Everything in Basic, plus:
                </h4>
                <ul className="space-y-4">
                  {features
                    .filter((f) => f.premium && !f.basic)
                    .slice(0, 6)
                    .map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          size={18}
                          className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <span className="text-gray-700">{feature.title}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Full Feature Comparison
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare all features across our plans to find the perfect fit for
              your needs.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-5xl mx-auto">
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4 font-medium text-gray-500">Features</div>
              <div className="p-4 font-medium text-center">Free</div>
              <div className="p-4 font-medium text-center bg-secondary/5">
                Basic
              </div>
              <div className="p-4 font-medium text-center">Premium</div>
            </div>

            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-4 border-b border-gray-100 ${
                  activeFeature === feature.title ? "bg-gray-50" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="p-4 flex items-center">
                  <span className="text-gray-700">{feature.title}</span>
                  <button
                    onClick={() => toggleFeatureDescription(feature.title)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <HelpCircle size={16} />
                  </button>
                </div>
                <div className="p-4 flex justify-center items-center">
                  {feature.free ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-gray-300" />
                  )}
                </div>
                <div className="p-4 flex justify-center items-center bg-secondary/5">
                  {feature.basic ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-gray-300" />
                  )}
                </div>
                <div className="p-4 flex justify-center items-center">
                  {feature.premium ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-gray-300" />
                  )}
                </div>
                {activeFeature === feature.title && (
                  <div className="col-span-4 p-4 bg-gray-50 text-gray-600 text-sm">
                    {feature.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Still have questions? Contact our support team at{" "}
              <a
                href="mailto:support@unihive.com"
                className="text-secondary hover:underline"
              >
                support@unihive.com
              </a>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-medium text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of students and professionals who are advancing
              their careers with UniHive.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="py-3 px-6 bg-secondary text-white font-medium rounded-lg text-center hover:bg-dark-orange transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/contact"
                className="py-3 px-6 bg-white text-primary font-medium rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
