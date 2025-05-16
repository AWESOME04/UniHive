import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Eye, Moon, CreditCard, User, Save, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      messages: true,
      updates: false
    },
    visibility: 'public'
  });

  useEffect(() => {
    // Simulate loading user settings
    setFormData(prev => ({
      ...prev,
      name: authUser?.name || '',
      email: authUser?.email || '',
      university: authUser?.university || ''
    }));
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checkbox.checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <Shield size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Eye size={20} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-secondary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-sm divide-y divide-gray-200"
        >
          {activeTab === 'account' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      <User size={24} className="text-secondary" />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(formData.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="font-medium text-gray-700 capitalize">{key}</label>
                          <p className="text-sm text-gray-500">Receive notifications for {key}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name={key}
                            checked={value}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-secondary">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Light Mode</span>
                        <Sun size={20} className="text-gray-400" />
                      </div>
                      <div className="w-full h-24 bg-gray-100 rounded"></div>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-secondary">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Dark Mode</span>
                        <Moon size={20} className="text-gray-400" />
                      </div>
                      <div className="w-full h-24 bg-gray-900 rounded"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Language</h3>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="p-6">
              <div className="text-center py-8">
                <CreditCard size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No billing information available</p>
                <button className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}

          <div className="p-6 bg-gray-50 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
