import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Cookie } from 'lucide-react';

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Cookie size={28} className="text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Cookie Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding how we use cookies to improve your experience.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-secondary">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <div className="prose prose-sm sm:prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              This Cookie Policy explains how UniHive ("we", "us", "our") uses cookies and similar 
              technologies to recognize you when you visit our website at 
              <a href="https://unihive.com" className="text-secondary hover:underline"> unihive.com </a> 
              ("Website"). It explains what these technologies are and why we use them, as well as your 
              rights to control our use of them.
            </p>

            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit 
              a website. Cookies are widely used by website owners in order to make their websites work, or 
              to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, UniHive) are called "first-party cookies". 
              Cookies set by parties other than the website owner are called "third-party cookies". Third-party 
              cookies enable third-party features or functionality to be provided on or through the website 
              (e.g., advertising, interactive content, and analytics). The parties that set these third-party 
              cookies can recognize your computer both when it visits the website in question and also when 
              it visits certain other websites.
            </p>

            <h2>3. Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for 
              technical reasons in order for our Website to operate, and we refer to these as "essential" or 
              "strictly necessary" cookies. Other cookies also enable us to track and target the interests of 
              our users to enhance the experience on our Website. Third parties serve cookies through our 
              Website for analytics and other purposes.
            </p>
            <p>
              The specific types of first and third-party cookies served through our Website and the purposes 
              they perform are described below:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our Website 
              and to use some of its features, such as access to secure areas. Because these cookies are 
              strictly necessary to deliver the Website, you cannot refuse them without impacting how our 
              Website functions.
            </p>

            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our Website but are 
              non-essential to their use. However, without these cookies, certain functionality may become 
              unavailable.
            </p>

            <h3>Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand 
              how our Website is being used or how effective our marketing campaigns are, or to help us 
              customize our Website for you.
            </p>

            <h2>4. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie 
              preferences by clicking on the appropriate opt-out links provided in the cookie banner on our website.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or refuse cookies. If you choose to 
              reject cookies, you may still use our website though your access to some functionality and areas 
              of our website may be restricted. As the means by which you can refuse cookies through your web 
              browser controls vary from browser-to-browser, you should visit your browser's help menu for more 
              information.
            </p>

            <h2>5. How Often Will We Update This Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to 
              the cookies we use or for other operational, legal, or regulatory reasons. Please therefore 
              revisit this Cookie Policy regularly to stay informed about our use of cookies and related 
              technologies.
            </p>
            <p>
              The date at the bottom of this Cookie Policy indicates when it was last updated.
            </p>

            <h2>6. Where Can You Get Further Information?</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
              <a href="mailto:privacy@unihive.com" className="text-secondary hover:underline"> privacy@unihive.com</a>
            </p>
            
            <p className="text-sm text-gray-500 mt-8">
              Last updated: May 6, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
