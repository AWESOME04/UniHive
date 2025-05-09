import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Check, X, AlertCircle, Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import paymentService from '../services/paymentService';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface Payment {
  id: string;
  amount: number;
  status: string;
  reference: string;
  hiveId: string;
  hive: {
    title: string;
    hiveType?: {
      name: string;
    };
  };
  createdAt: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'failed'>('all');
  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await paymentService.getPaymentHistory();
        if (response && response.data) {
          setPayments(response.data);
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
        setError('Failed to load payment history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Filter and sort payments
  let filteredPayments = [...payments];
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredPayments = filteredPayments.filter(payment => {
      if (statusFilter === 'completed') return payment.status.toLowerCase() === 'success';
      if (statusFilter === 'failed') return payment.status.toLowerCase() === 'failed';
      return true;
    });
  }
  
  // Apply search filter
  if (searchQuery) {
    filteredPayments = filteredPayments.filter(payment => 
      payment.hive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply sorting
  filteredPayments.sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
  
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'success') return 'bg-green-100 text-green-600';
    if (lowerStatus === 'failed') return 'bg-red-100 text-red-600';
    if (lowerStatus === 'pending') return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-600';
  };
  
  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'success') return <Check size={14} />;
    if (lowerStatus === 'failed') return <X size={14} />;
    if (lowerStatus === 'pending') return <AlertCircle size={14} />;
    return null;
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
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-700">Error</h3>
              <div className="text-sm text-red-600 mt-1">{error}</div>
            </div>
          </div>
        </div>
      ) : filteredPayments.length === 0 ? (
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
                        <Link to={`/dashboard/hives/${payment.hiveId}`} className="text-secondary hover:underline">
                          {payment.hive.title}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {payment.hive.hiveType?.name || "Essential"}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        GH₵ {payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1">{payment.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(payment.createdAt)}</div>
                        <div className="text-xs">{formatTime(payment.createdAt)}</div>
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
