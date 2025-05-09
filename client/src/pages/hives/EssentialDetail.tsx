import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowLeft, AlertCircle, MapPin, Calendar, Package, Tag, ChevronRight, Heart, Share, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hiveService from '../../services/hiveService';
import paymentService from '../../services/paymentService';
import { Hive, EssentialsDetails } from '../../types/hiveTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EssentialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [essential, setEssential] = useState<Hive | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentStatus] = useState<'none' | 'initiated' | 'success' | 'failed'>('none');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentCheckTimer, setPaymentCheckTimer] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const fetchEssential = async () => {
      try {
        setLoading(true);
        
        const response = await hiveService.getEssentials();
        const allEssentials = response.data || [];
        const foundEssential = allEssentials.find((item: any) => item.id === id);
        
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
      
      // REAL API CALL - Initialize payment with Paystack
      const response = await paymentService.initializePayment(essential.id);

      if (response && response.data && response.data.authorizationUrl) {
        // Store payment reference for verification after redirect
        if (response.data.reference) {
          sessionStorage.setItem('payment_reference', response.data.reference);
          sessionStorage.setItem('payment_hive_id', essential.id);
        }

        // Redirect to Paystack payment page
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

  // Check for payment verification on component mount
  useEffect(() => {
    const verifyPendingPayment = async () => {
      // Check if we have a reference from a redirect after payment
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference') || sessionStorage.getItem('payment_reference');
      
      if (reference) {
        try {
          setLoading(true);
          const verificationResult = await paymentService.verifyPayment(reference);
          
          if (verificationResult.status === 'success') {
            toast.success('Payment was successful! Thank you for your purchase.');
            
            // Clear the stored reference
            sessionStorage.removeItem('payment_reference');
            sessionStorage.removeItem('payment_hive_id');
            
            // Redirect to payment history page after successful verification
            navigate('/dashboard/payments');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error('Failed to verify payment. Please contact support.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    verifyPendingPayment();
  }, [navigate]);

  // For demo, handle verification automatically
  useEffect(() => {
    // Check for payment reference in URL (from Paystack redirect)
    const queryParams = new URLSearchParams(window.location.search);
    const reference = queryParams.get('reference');
    const storedReference = sessionStorage.getItem('payment_reference');
    
    // If we have a reference from Paystack, show verification message
    if ((reference || storedReference) && !isVerifying && essential) {
      const verifyPaymentTransaction = async (paymentReference: string) => {
        setIsVerifying(true);
        try {
          // For demo, we'll use mock verification
          const verificationResult = await paymentService.verifyPayment(paymentReference);
          
          if (verificationResult.status === 'success') {
            toast.success('Payment successful! Thank you for your purchase.', {
              autoClose: 5000,
              position: 'top-center',
            });
            
            // Clean URL by removing query parameters
            if (reference) {
              const url = new URL(window.location.href);
              url.search = '';
              window.history.replaceState({}, document.title, url.toString());
            }
            
            // Redirect to payment history after a delay
            setTimeout(() => {
              navigate('/dashboard/payments');
            }, 3000);
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error('Failed to verify payment. Please check your payment history.');
        } finally {
          sessionStorage.removeItem('payment_reference');
          sessionStorage.removeItem('payment_hive_id');
          setIsVerifying(false);
        }
      };
      
      // Use the reference from URL or session storage
      const paymentReference = reference || storedReference!;
      verifyPaymentTransaction(paymentReference);
    }
  }, [navigate, essential, isVerifying]);
  
  // Payment verification cleanup
  useEffect(() => {
    return () => {
      // Clear any payment check timers on component unmount
      if (paymentCheckTimer) {
        clearInterval(paymentCheckTimer);
      }
    };
  }, [paymentCheckTimer]);

  // Add function to manually check payment status
  const checkPaymentStatus = async (reference: string) => {
    try {
      setIsCheckingPayment(true);
      const result = await paymentService.verifyPayment(reference);
      
      if (result.status === 'success') {
        // Payment was successful
        toast.success('Payment successful! Thank you for your purchase.');
        
        // Clear any stored reference and timers
        sessionStorage.removeItem('payment_reference');
        sessionStorage.removeItem('payment_hive_id');
        
        if (paymentCheckTimer) {
          clearInterval(paymentCheckTimer);
          setPaymentCheckTimer(null);
        }
        
        // Redirect to payment history after a delay
        setTimeout(() => {
          navigate('/dashboard/payments');
        }, 3000);
        
        return true;
      } else {
        console.log('Payment not yet successful, status:', result.status);
        return false;
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    } finally {
      setIsCheckingPayment(false);
    }
  };
  
  // Check for payment reference in URL or session storage
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const reference = queryParams.get('reference') || sessionStorage.getItem('payment_reference');
    
    if (reference) {
      setPaymentReference(reference);
      
      // Initial check
      checkPaymentStatus(reference).then(success => {
        if (!success) {
          // If payment verification didn't succeed on first try, set up periodic checks
          const timer = setInterval(() => {
            checkPaymentStatus(reference).then(success => {
              if (success && paymentCheckTimer) {
                clearInterval(paymentCheckTimer);
                setPaymentCheckTimer(null);
              }
            });
          }, 5000); // Check every 5 seconds
          
          setPaymentCheckTimer(timer);
          
          // Stop checking after 2 minutes (24 checks)
          setTimeout(() => {
            if (paymentCheckTimer) {
              clearInterval(paymentCheckTimer);
              setPaymentCheckTimer(null);
              toast.warn('Payment verification timed out. If you completed the payment, please check your payment history.');
            }
          }, 2 * 60 * 1000);
        }
      });
      
      // Clean up URL
      if (queryParams.get('reference')) {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
      }
    }
  }, [navigate]);

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
  const essentialsDetails: EssentialsDetails = essential.essentialsDetails || {};
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
                {photos.map((photo: string, index: number) => (
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
                  {photos.slice(0, 4).map((photo: string, index: number) => (
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
      {paymentStatus === 'success' && (
        <motion.div 
          className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Payment Successful!</p>
              <p className="text-sm">Redirecting to payment history...</p>
            </div>
          </div>
        </motion.div>
      )}
      {/* Payment status indicator */}
      {isCheckingPayment && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
            <p>Verifying your payment...</p>
          </div>
        </div>
      )}
      
      {/* Manual verification button (if we have a reference but verification is taking time) */}
      {paymentReference && !isCheckingPayment && paymentCheckTimer && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => checkPaymentStatus(paymentReference)}
            className="bg-secondary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors"
          >
            Check Payment Status
          </button>
        </div>
      )}
    </div>
  );
};

export default EssentialDetail;
