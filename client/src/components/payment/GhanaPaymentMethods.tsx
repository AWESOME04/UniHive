import React from "react";

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
    id: "mtn",
    name: "MTN Mobile Money",
    shortCode: "MTN",
    color: "bg-yellow-100",
    textColor: "text-yellow-600",
    logo: "/mtn-logo.png",
  },
  {
    id: "airteltigo",
    name: "AirtelTigo Money",
    shortCode: "AT",
    color: "bg-blue-100",
    textColor: "text-blue-600",
    logo: "/airteltigo-logo.png",
  },
  {
    id: "telecel",
    name: "Telecel Money",
    shortCode: "TM",
    color: "bg-purple-100",
    textColor: "text-purple-600",
    logo: "/telecel-logo.png",
  },
  {
    id: "wewire",
    name: "We Wire",
    shortCode: "WW",
    color: "bg-orange-100",
    textColor: "text-orange-600",
    logo: "/wewire.png",
  },
];

interface GhanaPaymentMethodsProps {
  showExample?: boolean;
}

const GhanaPaymentMethods: React.FC<GhanaPaymentMethodsProps> = ({
  showExample = true,
}) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Easy Payments with Mobile Money
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get paid quickly and securely using Ghana's most popular mobile
              money services. No complicated bank transfers needed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ghanaPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                >
                  <div
                    className={`w-12 h-12 mr-3 rounded-lg flex items-center justify-center ${
                      !method.logo ? method.color : ""
                    }`}
                  >
                    {method.logo ? (
                      <img
                        src={method.logo}
                        alt={`${method.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className={`${method.textColor} font-bold`}>
                        {method.shortCode}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {showExample && (
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary opacity-20 rounded-xl blur-lg animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-md border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-primary">Payment Summary</h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">Live Demo</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-600 block">Task Completion</span>
                          <span className="text-xs text-gray-500">Base payment for service</span>
                        </div>
                        <span className="font-medium text-lg">GH₵ 120.00</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-600 block">Platform Fee</span>
                          <span className="text-xs text-gray-500">5% service charge</span>
                        </div>
                        <span className="font-medium text-red-500">- GH₵ 6.00</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-600 block">Mobile Money Fee</span>
                          <span className="text-xs text-gray-500">1% transaction fee</span>
                        </div>
                        <span className="font-medium text-red-500">- GH₵ 1.20</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 rounded-lg border border-secondary/20">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">Total Payout</span>
                        <span className="font-bold text-2xl text-secondary">
                          GH₵ 112.80
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-gradient-to-r from-secondary/10 to-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-sm font-medium text-primary/60 mb-3">Payment Method</div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-3 rounded-lg flex items-center justify-center bg-white p-2">
                        <img
                          src="/mtn-logo.png"
                          alt="MTN Mobile Money logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-primary">MTN Mobile Money</div>
                        <div className="text-sm text-gray-700 font-medium flex items-center">
                          <span className="mr-2">Instant Transfer</span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
                          <span className="text-green-600">No Extra Fees</span>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          Processing Time: ~1 minute
                        </div>
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
