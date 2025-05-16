import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Lock size={28} className="text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-secondary">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">Privacy Policy</span>
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
              At UniHive, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-700 mb-6">
              By accessing or using the Service, you consent to the collection, use, and storage of your 
              information as described in this Privacy Policy. If you do not agree with our policies and 
              practices, please do not use our Service.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect several types of information from and about users of our Service, including:
            </p>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, university name, field of study, 
                profile photo, and other information you provide when creating an account or updating your profile.
              </li>
              <li>
                <strong>Educational Information:</strong> Your university email, student ID, and enrollment status.
              </li>
              <li>
                <strong>Task Information:</strong> Details about tasks you post or accept, including descriptions, 
                prices, locations, and completion status.
              </li>
              <li>
                <strong>Communications:</strong> Messages exchanged with other users through our platform.
              </li>
              <li>
                <strong>Usage Information:</strong> How you interact with our Service, including access times, 
                pages viewed, and features used.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type, operating system, and other 
                technology on the devices you use to access our Service.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect about you to:
            </p>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>Create and maintain your account</li>
              <li>Verify your student status</li>
              <li>Connect you with other users for tasks</li>
              <li>Process transactions and send related information</li>
              <li>Send you service-related notifications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Improve our Service and develop new features</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect the security and integrity of our Service</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>
                <strong>With Other Users:</strong> Your profile information and task listings are visible to 
                other users of the Service. Messages you send through the platform are visible to the recipients.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share information with third-party vendors and 
                service providers who perform services for us.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information when required by law or to 
                protect our rights, property, or safety, or the rights, property, or safety of others.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset 
                sale, your information may be transferred as part of that transaction.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We have implemented appropriate technical and organizational security measures designed to 
              protect the security of any personal information we process. However, no method of transmission 
              over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your information</li>
              <li>Data portability</li>
              <li>Objection to certain processing activities</li>
            </ul>
            <p className="text-gray-700 mb-6">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We will retain your personal information only for as long as is necessary for the purposes set 
              out in this Privacy Policy. We will retain and use your information to the extent necessary to 
              comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our Service is not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children under 18. If we learn we have collected or received personal 
              information from a child under 18, we will delete that information.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">9. Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date at the 
              bottom of this page.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
              <a href="mailto:privacy@unihive.com" className="text-secondary hover:underline ml-1">privacy@unihive.com</a>
            </p>
            
            <div className="border-t border-gray-200 mt-8 pt-4">
              <p className="text-sm text-gray-500">
                Last updated: May 6, 2025
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/terms" className="inline-flex items-center text-secondary hover:underline">
            View our Terms of Service
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
