import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, BookOpen, Shield, Coffee, Info } from 'lucide-react';
import ScrollToTop from '../components/common/ScrollToTop';

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const valueCardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const teamCardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const socialButtonVariant = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(246, 169, 59, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const teamMembers = [
    {
      name: "Andrews Mintah",
      role: "Frontend Developer",
      image: "/assets/images/andrew.png", 
      university: "Central University",
      github: "https://github.com/Mintahandrews"
    },
    {
      name: "Evans Acheampong",
      role: "Backend Developer",
      image: "/assets/images/evans.png",
      university: "University of Ghana",
      github: "https://github.com/AWESOME04"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <Info size={28} className="text-secondary" />
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              About UniHive
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Connecting university students across Ghana to share skills, resources, and opportunities.
            </motion.p>
            <motion.div 
              className="flex items-center mt-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">About Us</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mission Section */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            UniHive was founded with a simple mission: to create a dedicated platform where university 
            students in Ghana can connect, collaborate, and create value for each other. We believe in 
            the power of student communities and the untapped potential that exists within them.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: <Users size={24} className="text-secondary" />,
              title: "Community",
              description: "Building meaningful connections between students across different universities and disciplines."
            },
            {
              icon: <BookOpen size={24} className="text-secondary" />,
              title: "Education",
              description: "Supporting academic success through resource sharing, mentorship, and collaborative learning."
            },
            {
              icon: <Shield size={24} className="text-secondary" />,
              title: "Trust",
              description: "Creating a safe, verified environment exclusively for registered university students."
            },
            {
              icon: <Coffee size={24} className="text-secondary" />,
              title: "Opportunity",
              description: "Empowering students to develop skills, earn income, and build their professional networks."
            }
          ].map((value, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm"
              variants={valueCardVariant}
              whileHover="hover"
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2 + index * 0.1
                }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-center">{value.title}</h3>
              <p className="text-gray-600 text-sm text-center">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.7,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
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
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            UniHive was created by a dedicated team of developers for the Hachive Hackathon 1.0 by Wewire.
          </p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.a 
                key={index}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                  variants={teamCardVariant}
                  whileHover="hover"
                >
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-secondary/20">
                        {member.name.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-contain object-center z-10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <motion.div 
                    className="p-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                  >
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-secondary text-sm">{member.role}</p>
                    <p className="text-gray-500 text-sm mt-1">{member.university}</p>
                    <p className="text-blue-500 text-sm mt-2 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View GitHub
                    </p>
                  </motion.div>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold text-xl mb-4 text-center">Connect With Us</h3>
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              {
                href: "https://twitter.com/unihive",
                icon: <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              },
              {
                href: "https://facebook.com/unihive",
                icon: <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              },
              {
                href: "https://instagram.com/unihive",
                icon: <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058-.976-.045-1.505-.207-1.858-.344-.467-.182-.8-.398-1.15-.748-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.047-1.023-.058-1.351-.058-3.807v-.468c0-2.456.011-2.784.058-3.807.045-.975.207-1.504.344-1.857.182-.466.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.041-.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                </svg>
              },
              {
                href: "https://linkedin.com/company/unihive",
                icon: <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors"
                variants={socialButtonVariant}
                whileHover="hover"
                whileTap="tap"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div 
          className="bg-secondary/10 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.7,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join the Hive Today
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Ready to connect with fellow students, find opportunities, and make the most of your university experience?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/register" 
              className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Add Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default About;
