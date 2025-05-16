import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Shield size={28} className="text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Terms of Service</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using the UniHive platform.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-secondary">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <div className="prose prose-sm sm:prose max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              Welcome to UniHive. These Terms of Service govern your use of our website located at 
              <a href="https://unihive.com" className="text-secondary hover:underline mx-1">unihive.com</a> 
              and form a binding legal agreement between you and UniHive.
            </p>
            <p className="text-gray-700 mb-6">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree 
              with any part of the terms, you may not access the Service.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">2. Eligibility</h2>
            <p className="text-gray-700 mb-6">
              UniHive is exclusively for university students in Ghana. By using UniHive, you represent and 
              warrant that you are currently enrolled as a student at a recognized university in Ghana and 
              that you have the legal capacity to enter into these terms.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is accurate, complete, 
              and current at all times. Failure to do so constitutes a breach of the Terms, which may result 
              in immediate termination of your account on our Service.
            </p>
            <p className="text-gray-700 mb-6">
              You are responsible for safeguarding the password that you use to access the Service and for 
              any activities or actions under your password.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">4. Conduct & Community Guidelines</h2>
            <p className="text-gray-700 mb-4">
              As a UniHive user, you agree to:
            </p>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>Use your real identity and provide accurate information about yourself</li>
              <li>Post only legal tasks, goods, and services</li>
              <li>Communicate respectfully with other users</li>
              <li>Fulfill commitments and tasks as promised</li>
              <li>Not use the platform for any illegal or unauthorized purpose</li>
              <li>Not engage in harassment, discrimination, or hate speech</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">5. Task Listings & Transactions</h2>
            <p className="text-gray-700 mb-4">
              UniHive facilitates connections between students offering and seeking tasks, goods, and services. 
              When listing a task, ensure all details are accurate. When accepting a task, you are committing 
              to complete it as specified.
            </p>
            <p className="text-gray-700 mb-6">
              UniHive is not responsible for the quality, safety, legality, or any other aspect of the tasks, 
              goods, and services listed on the platform.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">6. Payments & Fees</h2>
            <p className="text-gray-700 mb-6">
              All transactions between users are handled directly between the parties involved. UniHive may 
              introduce service fees in the future, which will be clearly communicated to all users.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              The Service and its original content, features, and functionality are and will remain the 
              exclusive property of UniHive. The Service is protected by copyright, trademark, and other 
              laws of Ghana and foreign countries.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account immediately, without prior notice or liability, for 
              any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall UniHive, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              By continuing to access or use our Service after those revisions become effective, you agree 
              to be bound by the revised terms.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms, please contact us at:
              <a href="mailto:legal@unihive.com" className="text-secondary hover:underline ml-1">legal@unihive.com</a>
            </p>
            
            <div className="border-t border-gray-200 mt-8 pt-4">
              <p className="text-sm text-gray-500">
                Last updated: May 6, 2025
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/privacy" className="inline-flex items-center text-secondary hover:underline">
            View our Privacy Policy
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
