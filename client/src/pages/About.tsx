import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, Shield, Coffee, Info } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Info size={28} className="text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">About UniHive</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connecting university students across Ghana to share skills, resources, and opportunities.
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-secondary">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mission Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            UniHive was founded with a simple mission: to create a dedicated platform where university 
            students in Ghana can connect, collaborate, and create value for each other. We believe in 
            the power of student communities and the untapped potential that exists within them.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Community</h3>
            <p className="text-gray-600 text-sm text-center">
              Building meaningful connections between students across different universities and disciplines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Education</h3>
            <p className="text-gray-600 text-sm text-center">
              Supporting academic success through resource sharing, mentorship, and collaborative learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Trust</h3>
            <p className="text-gray-600 text-sm text-center">
              Creating a safe, verified environment exclusively for registered university students.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Coffee size={24} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Opportunity</h3>
            <p className="text-gray-600 text-sm text-center">
              Empowering students to develop skills, earn income, and build their professional networks.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              UniHive was created as part of the Hachive Hackathon 1.0 organized by Wewire. Our team of passionate
              developers recognized a common challenge: the disconnect between student needs and available resources
              within university communities in Ghana. While students often had skills, items, or time to offer, there
              was no centralized platform to connect them with peers who needed those resources.
            </p>
            <p className="text-gray-600 mb-4">
              Starting with a simple idea—what if we could create a digital "hive" where students could 
              exchange skills and resources?—we developed UniHive focused on connecting students through
              various "hives" or categories based on different needs and offerings.
            </p>
            <p className="text-gray-600 mb-4">
              As participants in the Hachive Hackathon 1.0 by <a href="https://www.wewire.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Wewire</a>,
              we aimed to create a solution that addresses real challenges faced by university students in Ghana
              while showcasing innovative technology and design thinking.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            UniHive was created by a dedicated team of developers for the Hachive Hackathon 1.0 by Wewire.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: "Andrews Mintah",
                role: "Frontend Developer",
                image: "/assets/team/placeholder.png",
                university: "Central University"
              },
              {
                name: "Evans Acheampong",
                role: "Backend Developer",
                image: "/assets/team/placeholder.png",
                university: "University of Ghana"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-secondary text-sm">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{member.university}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <h3 className="font-bold text-xl mb-4 text-center">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://twitter.com/unihive" target="_blank" rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="https://facebook.com/unihive" target="_blank" rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/unihive" target="_blank" rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/company/unihive" target="_blank" rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="bg-secondary/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Hive Today</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Ready to connect with fellow students, find opportunities, and make the most of your university experience?
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
