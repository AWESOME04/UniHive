import React from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  shortCode: string;
  color: string;
  textColor: string;
  logo?: string;
}

const ghanaPaymentMethods: PaymentMethod[] = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    shortCode: 'MTN',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-600',
  },
  {
    id: 'vodafone',
    name: 'Vodafone Cash',
    shortCode: 'VC',
    color: 'bg-red-100',
    textColor: 'text-red-600',
  },
  {
    id: 'airteltigo',
    name: 'AirtelTigo Money',
    shortCode: 'AT',
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    id: 'zeepay',
    name: 'Zeepay',
    shortCode: 'ZP',
    color: 'bg-green-100',
    textColor: 'text-green-600',
  }
];

interface GhanaPaymentMethodsProps {
  showExample?: boolean;
}

const GhanaPaymentMethods: React.FC<GhanaPaymentMethodsProps> = ({ showExample = true }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Easy Payments with Mobile Money</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get paid quickly and securely using Ghana's most popular mobile money services. No complicated bank transfers needed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ghanaPaymentMethods.map(method => (
                <div key={method.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                  <div className={`w-10 h-10 mr-3 rounded-full ${method.color} flex items-center justify-center`}>
                    <span className={`${method.textColor} font-bold`}>{method.shortCode}</span>
                  </div>
                  <span className="font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {showExample && (
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary opacity-20 rounded-xl blur-lg"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-md">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Payment Summary</h3>
                    <span className="text-sm text-gray-500">Example</span>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Task Completion</span>
                      <span className="font-medium">GH₵ 120.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">GH₵ 6.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mobile Money Fee</span>
                      <span className="font-medium">GH₵ 1.20</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total Payout</span>
                      <span className="font-bold text-secondary">GH₵ 112.80</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 font-bold">MTN</span>
                      </div>
                      <div>
                        <div className="font-medium">MTN Mobile Money</div>
                        <div className="text-sm text-gray-500">**** 7890</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GhanaPaymentMethods;
