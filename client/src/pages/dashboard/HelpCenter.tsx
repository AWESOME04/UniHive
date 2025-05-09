import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileQuestion, ChevronRight } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <Book size={20} />,
      articles: [
        'How to create an account',
        'Setting up your profile',
        'Finding your first task'
      ]
    },
    {
      title: 'Common Questions',
      icon: <FileQuestion size={20} />,
      articles: [
        'Payment methods',
        'Task completion process',
        'Rating system explained'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Help Center</h1>
        
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <span className="p-2 rounded-lg bg-secondary/10 text-secondary mr-3">
                  {category.icon}
                </span>
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>
              <ul className="space-y-3">
                {category.articles.map((article, idx) => (
                  <li key={idx}>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-between group">
                      <span>{article}</span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-secondary" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
