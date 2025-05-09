import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowLeft, AlertCircle, MapPin, Calendar, Package, Tag, ChevronRight, Heart, Share } from 'lucide-react';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hiveService from '../../services/hiveService';
import paymentService from '../../services/paymentService';
import { Hive } from '../../types/hiveTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EssentialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [essential, setEssential] = useState<Hive | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchEssential = async () => {
      try {
        setLoading(true);
        
        const response = await hiveService.getEssentials();
        const allEssentials = response.data || [];
        const foundEssential = allEssentials.find(item => item.id === id);
        
        if (foundEssential) {
          console.log('Found essential:', foundEssential);
          setEssential(foundEssential);
        } else {
          setError('Essential not found');
        }
      } catch (error) {
        console.error('Error fetching essential:', error);
        setError('Failed to load essential details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchEssential();
    }
  }, [id]);
  
  const handlePaymentInitiation = async () => {
    try {
      if (!essential) return;
      
      setIsProcessingPayment(true);
      const response = await paymentService.initializePayment(essential.id);

      if (response && response.data && response.data.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
      } else {
        toast.error('Failed to initiate payment process');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Payment initialization failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner /></div>;
  }
  
  if (error || !essential) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error || 'Essential not found'}</p>
            <button 
              onClick={() => navigate('/dashboard/hives/essentials')}
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-600 underline"
            >
              Return to Essentials
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Extract properties from the essential object and its nested essentialsDetails
  const {
    title,
    description,
    price,
    postedBy,
    createdAt,
  } = essential;
  
  // Access the nested essentialsDetails object
  const essentialsDetails = essential.essentialsDetails || {};
  const {
    condition = 'N/A',
    brand = 'N/A',
    purchaseDate = 'N/A',
    itemCategory = 'Item',
    photos = [],
    pickupLocation = 'Not specified'
  } = essentialsDetails;
  
  // Format purchase date if available
  const formattedPurchaseDate = purchaseDate && purchaseDate !== 'N/A' 
    ? formatDate(purchaseDate) 
    : 'N/A';
  
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard/hives/essentials')}
          className="flex items-center text-gray-600 hover:text-secondary transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Essentials</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {photos && photos.length > 0 ? (
            <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                className="w-full aspect-square"
              >
                {photos.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <motion.img 
                        src={photo} 
                        alt={`${title} - Image ${index + 1}`} 
                        className="max-w-full max-h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Thumbnail preview - optional */}
              {photos.length > 1 && (
                <div className="flex mt-2 gap-2 px-2 pb-2">
                  {photos.slice(0, 4).map((photo, index) => (
                    <div 
                      key={`thumb-${index}`} 
                      className="w-16 h-16 rounded border border-gray-200 cursor-pointer hover:border-secondary transition-colors"
                    >
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                  {photos.length > 4 && (
                    <div className="w-16 h-16 rounded border border-gray-200 flex items-center justify-center bg-gray-50 text-gray-500">
                      +{photos.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl flex items-center justify-center h-80">
              <Package size={64} className="text-gray-400" />
            </div>
          )}
          
          {/* Social buttons */}
          <div className="flex mt-4 gap-3">
            <motion.button 
              className="flex items-center justify-center gap-1 bg-white rounded-lg border border-gray-200 py-2 px-4 text-gray-600 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={16} />
              <span className="text-sm">Save</span>
            </motion.button>
            <motion.button 
              className="flex items-center justify-center gap-1 bg-white rounded-lg border border-gray-200 py-2 px-4 text-gray-600 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share size={16} />
              <span className="text-sm">Share</span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
            {/* Title and price */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <div className="text-xl font-bold text-secondary">GH₵ {typeof price === 'number' ? price.toFixed(2) : price}</div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700">{description}</p>
            </div>
            
            {/* Item details */}
            <div className="space-y-4 mb-6">
              <h3 className="font-medium text-gray-900">Item Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Package size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p className="text-sm font-medium">{condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Tag size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Brand</p>
                    <p className="text-sm font-medium">{brand}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Purchase Date</p>
                    <p className="text-sm font-medium">{formattedPurchaseDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <Tag size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium">{itemCategory}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Pickup Location</h3>
              <div className="flex items-center">
                <MapPin size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{pickupLocation}</span>
              </div>
            </div>
            
            {/* Seller info */}
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                  {postedBy?.avatar ? (
                    <img src={postedBy.avatar} alt={postedBy.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-medium text-gray-500">
                      {postedBy?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{postedBy?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">
                    Posted {createdAt ? formatDate(createdAt) : 'recently'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment button */}
            <motion.button
              className="w-full bg-secondary text-white py-3 rounded-lg font-medium flex items-center justify-center relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePaymentInitiation}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Pay GH₵ {typeof price === 'number' ? price.toFixed(2) : price}
                  <ChevronRight size={16} className="ml-1" />
                </>
              )}
            </motion.button>
          </div>
          
          {/* Payment details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
            <h3 className="font-medium text-gray-900 mb-4">Payment Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Item Price</span>
                <span className="font-medium">GH₵ {typeof price === 'number' ? price.toFixed(2) : price}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (5%)</span>
                <span className="font-medium">GH₵ {typeof price === 'number' ? (price * 0.05).toFixed(2) : '0.00'}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Processing Fee (1.5%)</span>
                <span className="font-medium">GH₵ {typeof price === 'number' ? (price * 0.015).toFixed(2) : '0.00'}</span>
              </div>
              
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-secondary">
                  GH₵ {typeof price === 'number' 
                    ? (price + price * 0.05 + price * 0.015).toFixed(2) 
                    : price}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                * Payments are processed securely via Paystack.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EssentialDetail;
