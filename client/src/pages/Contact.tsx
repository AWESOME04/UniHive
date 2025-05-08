import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Animation variants
  const fadeInUp = {
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
  
  const contactItemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialIconVariant = {
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(246, 169, 59, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const faqVariant = {
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
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

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
              <Mail size={28} className="text-secondary" />
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Have questions or feedback? We'd love to hear from you.
            </motion.p>
            <motion.div 
              className="flex items-center mt-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-secondary">Contact</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
              
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
              >
                <motion.div 
                  className="flex items-start"
                  variants={contactItemVariant}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(246, 169, 59, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin size={20} className="text-secondary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium mb-1">Our Location</h3>
                    <p className="text-gray-600 text-sm">
                      University of Ghana, Legon<br />
                      Accra, Ghana
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={contactItemVariant}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(246, 169, 59, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail size={20} className="text-secondary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-gray-600 text-sm">
                      <motion.a 
                        href="mailto:hello@unihive.com" 
                        className="hover:text-secondary transition-colors"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        hello@unihive.com
                      </motion.a><br />
                      <motion.a 
                        href="mailto:support@unihive.com" 
                        className="hover:text-secondary transition-colors"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        support@unihive.com
                      </motion.a>
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={contactItemVariant}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(246, 169, 59, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone size={20} className="text-secondary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-gray-600 text-sm">
                      <motion.a 
                        href="tel:+233300000000" 
                        className="hover:text-secondary transition-colors"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        +233 30 000 0000
                      </motion.a><br />
                      Monday-Friday, 9am-5pm
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="font-bold mt-8 mb-4"
                variants={fadeInUp}
              >
                Connect With Us
              </motion.h3>
              <motion.div 
                className="flex space-x-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    href: "https://twitter.com/unihive",
                    icon: <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  },
                  {
                    href: "https://facebook.com/unihive",
                    icon: <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  },
                  {
                    href: "https://instagram.com/unihive",
                    icon: <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                    </svg>
                  },
                  {
                    href: "https://linkedin.com/company/unihive",
                    icon: <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary/10 transition-colors"
                    variants={socialIconVariant}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="bg-green-50 text-green-700 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <motion.svg 
                        className="h-5 w-5 text-green-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 20, 0] }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </motion.svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Message sent successfully!</h3>
                      <p className="mt-2 text-sm">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                      </p>
                      <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          type="button"
                          className="text-sm font-medium text-secondary hover:text-secondary/80 focus:outline-none"
                          onClick={() => setIsSubmitted(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Send another message
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.01, borderColor: "#F6A93B" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.01, borderColor: "#F6A93B" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                      placeholder="How can we help you?"
                      whileFocus={{ scale: 1.01, borderColor: "#F6A93B" }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                      placeholder="Your message here..."
                      whileFocus={{ scale: 1.01, borderColor: "#F6A93B" }}
                      transition={{ duration: 0.2 }}
                    ></motion.textarea>
                  </motion.div>
                  
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center w-full md:w-auto px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.svg 
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </motion.svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Map */}
        <motion.div 
          className="mt-10 bg-white rounded-xl shadow-sm p-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <motion.div 
            className="aspect-[16/9] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-full h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.495059125059!2d-0.19077732427066947!3d5.650153032834428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeabe93%3A0xd78257e67498c1dc!2sUniversity%20of%20Ghana!5e0!3m2!1sen!2sgh!4v1688379594981!5m2!1sen!2sgh" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="University of Ghana, Legon, Accra"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
          <div className="py-3 px-2 text-center">
            <p className="text-sm text-gray-600">
              <MapPin size={16} className="inline-block mr-1" />
              University of Ghana, Legon, Accra, Ghana
            </p>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                question: "How do I create an account on UniHive?",
                answer: "To create a UniHive account, click the 'Sign Up' button on our homepage and follow the registration process. You'll need to verify your student status with a university email address."
              },
              {
                question: "Is UniHive only for students in Ghana?",
                answer: "Yes, currently UniHive is specifically designed for and limited to university students in Ghana. We plan to expand to other countries in the future."
              },
              {
                question: "How do I post a task on UniHive?",
                answer: "After logging in, navigate to your dashboard and click on 'Post a Task'. Fill in the required details about your task, including description, category, and payment information if applicable."
              },
              {
                question: "Is there a fee for using UniHive?",
                answer: "UniHive is currently free to use for all verified university students. We may introduce premium features in the future, but our core services will remain accessible to all students."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-sm p-6"
                variants={faqVariant}
                whileHover="hover"
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <motion.h3 
                  className="font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {faq.question}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
