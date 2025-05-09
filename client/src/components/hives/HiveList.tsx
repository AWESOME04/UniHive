import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Loader, User, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import hiveService from '../../services/hiveService';
import HiveDetail from './HiveDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

type HiveType = "essentials" | "academia" | "logistics" | "buzz" | "archive" | "sidehustle";

interface HiveListProps {
  title: string;
  type: HiveType;
  icon: React.ReactNode;
  color: string;
}

const HiveList: React.FC<HiveListProps> = ({ title, type, icon, color }) => {
  const [hives, setHives] = useState<any[]>([]);
  const [selectedHive, setSelectedHive] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch hives on component mount
  useEffect(() => {
    fetchHives();
  }, [type]);

  // Open hive detail modal if ID is in URL
  useEffect(() => {
    if (id && hives.length > 0) {
      const hive = hives.find(h => h.id === id);
      if (hive) {
        setSelectedHive(hive);
        setIsModalOpen(true);
      }
    }
  }, [id, hives]);

  // Fetch hives based on type
  const fetchHives = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (type) {
        case 'essentials':
          response = await hiveService.getEssentials();
          break;
        case 'academia':
          response = await hiveService.getAcademia();
          break;
        case 'logistics':
          response = await hiveService.getLogistics();
          break;
        case 'buzz':
          response = await hiveService.getBuzz();
          break;
        case 'archive':
          response = await hiveService.getArchive();
          break;
        case 'sidehustle':
          response = await hiveService.getSideHustle();
          break;
        default:
          response = { data: [] };
      }
      
      if (response && response.data) {
        setHives(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${type} hives:`, error);
      toast.error(`Failed to load ${title.toLowerCase()}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save (create or update)
  const handleSave = async (formData: any) => {
    try {
      
      if (isCreating) {
        // Create new hive
        switch (type) {
          case 'essentials':
            Response = await hiveService.createEssential(formData);
            break;
          case 'academia':
            Response = await hiveService.createAcademia(formData);
            break;
          case 'logistics':
            Response = await hiveService.createLogistics(formData);
            break;
          case 'buzz':
            Response = await hiveService.createBuzz(formData);
            break;
          case 'archive':
            Response = await hiveService.createArchive(formData);
            break;
          case 'sidehustle':
            Response = await hiveService.createSideHustle(formData);
            break;
        }
        toast.success(`New ${type} listing created successfully!`);
      } else {
        // Update existing hive
        switch (type) {
          case 'essentials':
            Response = await hiveService.updateEssential(selectedHive.id, formData);
            break;
          case 'academia':
            Response = await hiveService.updateAcademia(selectedHive.id, formData);
            break;
          case 'logistics':
            Response = await hiveService.updateLogistics(selectedHive.id, formData);
            break;
          case 'buzz':
            Response = await hiveService.updateBuzz(selectedHive.id, formData);
            break;
          case 'archive':
            Response = await hiveService.updateArchive(selectedHive.id, formData);
            break;
          case 'sidehustle':
            Response = await hiveService.updateSideHustle(selectedHive.id, formData);
            break;
        }
        toast.success(`${type} listing updated successfully!`);
      }
      
      // Refresh hives list
      await fetchHives();
      
      // Close modal and reset state
      setIsModalOpen(false);
      setSelectedHive(null);
      setIsCreating(false);
      
      // Remove ID from URL if present
      if (id) {
        navigate(`/dashboard/hives/${type}`);
      }
    } catch (error) {
      console.error(`Error ${isCreating ? 'creating' : 'updating'} ${type}:`, error);
      toast.error(`Failed to ${isCreating ? 'create' : 'update'} listing. Please try again.`);
    }
  };

  // Handle create new hive
  const handleCreate = () => {
    setSelectedHive({});
    setIsCreating(true);
    setIsModalOpen(true);
  };

  // Handle view/edit existing hive
  const handleViewHive = (hive: any) => {
    setSelectedHive(hive);
    setIsCreating(false);
    setIsModalOpen(true);
    
    // Add ID to URL for bookmarking/sharing
    navigate(`/dashboard/hives/${type}/${hive.id}`);
  };

  // Filter hives based on search query
  const filteredHives = searchQuery
    ? hives.filter(hive => 
        hive.title && hive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hive.description && hive.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : hives;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Helper function to format price display safely
  const formatPrice = (price: string | number | null | undefined): string => {
    if (price === null || price === undefined) {
      return 'Free';
    }
    
    if (typeof price === 'number') {
      return `₵${price.toFixed(2)}`;
    }
    
    if (typeof price === 'string') {
      // If it's a string, try to parse it as a number
      if (price === '' || price === '0' || price === '0.00') {
        return 'Free';
      }
      
      const numPrice = parseFloat(price);
      if (!isNaN(numPrice)) {
        return `₵${numPrice.toFixed(2)}`;
      }
      
      // If it's already formatted or can't be parsed, return as is
      return price.startsWith('₵') ? price : `₵${price}`;
    }
    
    return 'Free';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with search and filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${color} text-white mr-3`}>
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">
              {filteredHives.length} {filteredHives.length === 1 ? 'listing' : 'listings'} available
            </p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          
          <button 
            onClick={handleCreate}
            className="flex items-center justify-center px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Create New
          </button>
        </div>
      </div>
      
      {/* Main content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader size={40} className="text-secondary animate-spin mb-4" />
          <p className="text-gray-500">Loading {title.toLowerCase()}...</p>
        </div>
      ) : filteredHives.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredHives.map((hive) => (
            <motion.div
              key={hive.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => handleViewHive(hive)}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{hive.title}</h3>
                
                {hive.price !== undefined && (
                  <div className="text-secondary font-bold mb-2">{formatPrice(hive.price)}</div>
                )}
                
                {hive.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hive.description}</p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  {hive.postedBy && (
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{hive.postedBy.name || 'Anonymous'}</span>
                    </div>
                  )}
                  
                  {hive.createdAt && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{formatDistanceToNow(new Date(hive.createdAt), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${color} bg-opacity-20 flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No {title.toLowerCase()} found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No listings match your search "${searchQuery}". Try different keywords or clear your search.`
              : `There are no ${title.toLowerCase()} listings available at the moment.`
            }
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Post Your {type === 'essentials' ? 'Item' : 'Listing'}
            </button>
          )}
        </div>
      )}
      
      {/* Hive detail modal */}
      <AnimatePresence>
        {isModalOpen && selectedHive && (
          <HiveDetail 
            hive={selectedHive}
            type={type}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedHive(null);
              if (id) {
                navigate(`/dashboard/hives/${type}`);
              }
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HiveList;
