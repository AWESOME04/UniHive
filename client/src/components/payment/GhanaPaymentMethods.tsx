import React from 'react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
}

const ghanaPaymentMethods: PaymentMethod[] = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    logo: '/images/payment/mtn-momo.png',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'vodafone',
    name: 'Vodafone Cash',
    logo: '/images/payment/voda-cash.png',
    bgColor: 'bg-red-50',
  },
  {
    id: 'airteltigo',
    name: 'AirtelTigo Money',
    logo: '/images/payment/airtle-tigo.png',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'paystack',
    name: 'Paystack',
    logo: '/images/payment/paystack.png',
    bgColor: 'bg-green-50',
  }
];

interface GhanaPaymentMethodsProps {
  showExample?: boolean;
}

const GhanaPaymentMethods: React.FC<GhanaPaymentMethodsProps> = ({ showExample = true }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Easy Payments with Mobile Money</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get paid quickly and securely using Ghana's most popular mobile money services. No complicated bank transfers needed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ghanaPaymentMethods.map(method => (
                <motion.div 
                  key={method.id} 
                  className={`bg-white p-4 rounded-lg shadow-sm flex items-center ${method.bgColor} border border-gray-100`}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-12 h-12 mr-3 flex-shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                    <img 
                      src={method.logo} 
                      alt={method.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-700">{method.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {showExample && (
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary opacity-20 rounded-xl blur-lg"></div>
                <motion.div 
                  className="relative bg-white p-6 rounded-xl shadow-lg max-w-md w-full overflow-hidden"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-md"></div>
                  <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary rounded-full opacity-10 blur-md"></div>
                  
                  <div className="relative">
                    {/* Header with transaction ID */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Payment Receipt</h3>                        <p className="text-xs text-gray-500">Transaction ID: UNIHIVE-28756394</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">Completed</span>
                    </div>

                    {/* Payment details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-3">
                        <div>
                          <span className="block text-sm text-gray-500">Service</span>
                          <span className="block text-base font-medium text-gray-800">Design Logo for Student Club</span>
                        </div>
                        <span className="font-medium text-gray-800">GH₵ 120.00</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee (5%)</span>
                        <span className="font-medium text-gray-600">- GH₵ 6.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mobile Money Fee (1%)</span>
                        <span className="font-medium text-gray-600">- GH₵ 1.20</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center">
                        <span className="font-semibold text-gray-800">Total Payout</span>
                        <span className="font-bold text-lg text-secondary">GH₵ 112.80</span>
                      </div>
                    </div>
                    
                    {/* Payment method used */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-3 bg-white rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                          <img src="/images/payment/mtn-momo.png" alt="MTN Mobile Money" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">MTN Mobile Money</div>
                          <div className="text-sm text-gray-500">**** 7890 • Samuel Ofori</div>
                        </div>
                        <div className="ml-auto">
                          <motion.div
                            className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Date and support */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>March 14, 2023 • 2:30 PM</span>
                      <a href="#" className="text-secondary hover:underline">Need help?</a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GhanaPaymentMethods;
