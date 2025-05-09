import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, Clock, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('saved');

  const mockFavorites = [
  {
    id: 1,
    title: "Web Development Project",
    description: "Create a responsive e-commerce website with modern UI",
    price: "₵500",
    location: "Remote",
    savedAt: "2 days ago",
    rating: 4.5,
    category: "SideHustle"
  },
  {
    id: 2,
    title: "Used Laptop",
    description: "HP Laptop - 8GB RAM, 256GB SSD, 15.6 inch display",
    price: "₵2,000",
    location: "Legon Campus",
    savedAt: "1 week ago",
    rating: 4.0,
    category: "Essentials"
  },
  {
    id: 4,
    title: "Campus Food Delivery",
    description: "Delivering hot meals to students across campus",
    price: "₵15 per delivery",
    location: "University Area",
    savedAt: "5 days ago",
    rating: 4.7,
    category: "Logistics"
  },
  {
    id: 5,
    title: "Economics Textbook",
    description: "Principles of Macroeconomics 5th Edition, like new condition",
    price: "₵120",
    location: "Business School",
    savedAt: "1 day ago",
    rating: 4.1,
    category: "Academia"
  },
  {
    id: 6,
    title: "Campus Event Photography",
    description: "Professional photos for student events and graduations",
    price: "₵250",
    location: "Campus-wide",
    savedAt: "4 days ago",
    rating: 4.8,
    category: "SideHustle"
  },
  {
    id: 7,
    title: "Used Scientific Calculator",
    description: "Texas Instruments TI-84 Plus, excellent condition",
    price: "₵180",
    location: "Science Campus",
    savedAt: "2 weeks ago",
    rating: 3.9,
    category: "Essentials"
  },
];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="px-16 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
            <p className="text-gray-600 mt-1">Access your saved items and liked services</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark size={16} className="inline-block mr-2" />
              Saved
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'liked'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart size={16} className="inline-block mr-2" />
              Liked
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockFavorites.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-bold">{item.price}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {item.location}
                  </div>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  Saved {item.savedAt}
                </div>
                <Link
                  to={`/dashboard/services/${item.id}`}
                  className="text-secondary hover:text-secondary/80 flex items-center text-sm font-medium"
                >
                  View Details
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
