import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Check, X, AlertCircle, Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MockPaymentDisplay {
  id: string;
  itemTitle: string;
  itemType: string;
  amount: number;
  status: string;
  reference: string;
  date: string;
  itemId: string;
}

const DEMO_PAYMENTS: MockPaymentDisplay[] = [
  {
    id: 'demo-1',
    itemTitle: 'Electric Stove for Sale',
    itemType: 'Essential',
    amount: 350.00,
    status: 'success',
    reference: 'UNIHIVE-DEMO-123456',
    date: new Date().toISOString(),
    itemId: 'stove-123'
  },
  {
    id: 'demo-2',
    itemTitle: 'HP Laptop (Used)',
    itemType: 'Essential',
    amount: 1200.00,
    status: 'pending',
    reference: 'UNIHIVE-DEMO-789012',
    date: new Date(Date.now() - 86400000).toISOString(),
    itemId: 'laptop-456'
  }
];

const Payments: React.FC = () => {
  const [payments] = useState<MockPaymentDisplay[]>(DEMO_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'failed'>('all');

  let filteredPayments = payments.filter(payment => {
    if (statusFilter === 'completed' && payment.status !== 'success') return false;
    if (statusFilter === 'failed' && payment.status !== 'failed') return false;

    if (searchQuery) {
      return payment.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
             payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  // Simple sort function based on mock data structure
  filteredPayments.sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === 'asc'
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
  });

  const toggleSort = (column: 'date' | 'amount') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-600 mt-1">View and track all your transactions</p>
      </motion.div>
      
      {/* Filters and search */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              statusFilter === 'all' ? 'bg-secondary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              statusFilter === 'completed' ? 'bg-secondary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              statusFilter === 'failed' ? 'bg-secondary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setStatusFilter('failed')}
          >
            Failed
          </button>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-white p-2 rounded-lg border border-gray-300">
            <Filter size={16} className="text-gray-600" />
          </button>
        </div>
      </motion.div>
      
      {filteredPayments.length === 0 ? (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <DollarSign size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No payments found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== 'all' 
              ? "No payments match your current filters. Try changing your search criteria." 
              : "You haven't made any payments yet."}
          </p>
          {searchQuery || statusFilter !== 'all' ? (
            <button 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="text-secondary font-medium hover:underline"
            >
              Clear filters
            </button>
          ) : (
            <Link 
              to="/dashboard/hives/essentials"
              className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Browse Essentials
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('amount')}
                    >
                      <div className="flex items-center">
                        Amount
                        {sortBy === 'amount' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('date')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortBy === 'date' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <motion.tr 
                      key={payment.id}
                      className="hover:bg-gray-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`/dashboard/hives/essentials/${payment.itemId}`} 
                          className="text-secondary hover:underline"
                        >
                          {payment.itemTitle}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {payment.itemType}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        GH₵ {payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'success' ? 'bg-green-100 text-green-600' :
                          payment.status === 'failed' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {payment.status === 'success' && <Check size={14} className="mr-1" />}
                          {payment.status === 'failed' && <X size={14} className="mr-1" />}
                          {payment.status === 'pending' && <AlertCircle size={14} className="mr-1" />}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{new Date(payment.date).toLocaleDateString()}</div>
                        <div className="text-xs">{new Date(payment.date).toLocaleTimeString()}</div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Payments;
