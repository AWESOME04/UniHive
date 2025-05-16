import React from 'react';
import { XCircle, AlertTriangle, RefreshCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorType: 'network' | 'verification' | 'timeout' | 'unknown';
  reference?: string;
  onRetry?: () => void;
}

const PaymentErrorModal: React.FC<PaymentErrorModalProps> = ({
  isOpen,
  onClose,
  errorType,
  reference,
  onRetry
}) => {
  // Error content based on type
  const getErrorContent = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: <XCircle size={40} className="text-red-500" />,
          title: 'Connection Error',
          description: 'We encountered a network issue while processing your payment. Your internet connection may be unstable.',
          instruction: 'Please check your internet connection and try again.'
        };
      case 'verification':
        return {
          icon: <AlertTriangle size={40} className="text-yellow-500" />,
          title: 'Verification Issue',
          description: 'We couldn\'t verify your payment status due to connection issues with our payment provider.',
          instruction: 'Your payment might still have been processed. Please check your payment history or bank statement.'
        };
      case 'timeout':
        return {
          icon: <AlertTriangle size={40} className="text-orange-500" />,
          title: 'Verification Timeout',
          description: 'The payment verification process is taking longer than expected.',
          instruction: 'Please check your payment history or bank statement to confirm if the payment was successful.'
        };
      default:
        return {
          icon: <AlertTriangle size={40} className="text-red-500" />,
          title: 'Payment Error',
          description: 'Something went wrong during the payment process.',
          instruction: 'Please try again or contact support if the issue persists.'
        };
    }
  };

  const content = getErrorContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {content.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-gray-600 mb-2">{content.description}</p>
              <p className="text-gray-600 mb-4">{content.instruction}</p>
              
              {reference && (
                <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4 w-full">
                  <p className="text-gray-500 mb-1">Payment Reference:</p>
                  <p className="font-mono font-medium">{reference}</p>
                </div>
              )}
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex-1 py-2 px-4 bg-secondary text-white rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={16} />
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentErrorModal;
