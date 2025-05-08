import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Kofi Mensah",
    university: "University of Ghana, 3rd Year",
    text: "Through UniHive, I found a graphic design gig that pays for my weekend expenses. The platform is so easy to use and has connected me with long-term clients.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Ama Boateng",
    university: "KNUST, 2nd Year",
    text: "I sold my old textbooks and calculator on UniHive and made enough to buy new ones for this semester. It's great to have a marketplace just for students!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "David Osei",
    university: "Central University, 4th Year",
    text: "As an international student, UniHive helped me find tutoring opportunities and connect with local students. I now earn while helping others with their studies.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-0">
        <motion.div 
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            What Students Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Hear from university students who have found opportunities and
            connections through UniHive
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md relative"
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-secondary text-sm sm:text-lg mb-2 sm:mb-3">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-700">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {testimonial.university}
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-secondary opacity-10 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary opacity-10 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
