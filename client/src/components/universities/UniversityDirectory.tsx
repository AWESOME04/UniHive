import { MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the university type
interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  students: string;
  description?: string;
}

// Data for universities
const universities: University[] = [
  { 
    id: 'uog', 
    name: 'University of Ghana', 
    location: 'Legon, Accra', 
    image: '/universityofghana.png', 
    students: '38,000+',
    description: 'The oldest and largest university in Ghana, offering a wide range of programs across various disciplines.'
  },
  { 
    id: 'knust', 
    name: 'Kwame Nkrumah University', 
    location: 'Kumasi', 
    image: '/knust.png', 
    students: '42,000+',
    description: 'Known for its strong focus on science and technology education, research and entrepreneurship.'
  },
  { 
    id: 'ucc', 
    name: 'University of Cape Coast', 
    location: 'Cape Coast', 
    image: '/ucc.png', 
    students: '21,000+',
    description: 'Renowned for its education programs and beautiful coastal campus setting.'
  },
  { 
    id: 'central', 
    name: 'Central University', 
    location: 'Accra', 
    image: '/central.png', 
    students: '8,000+',
    description: 'A private Christian university offering diverse programs with a focus on ethical leadership and character development.'
  },
  { 
    id: 'gimpa', 
    name: 'Ghana Institute of Management', 
    location: 'Accra', 
    image: '/gimpa.png', 
    students: '15,000+',
    description: 'A leading institution for management and public administration education in Ghana.'
  },
  { 
    id: 'ashesi', 
    name: 'Ashesi University', 
    location: 'Berekuso', 
    image: '/ash.png', 
    students: '1,200+',
    description: 'Innovative private university known for its focus on ethical leadership and entrepreneurship.'
  },
  { 
    id: 'upsa', 
    name: 'University of Professional Studies', 
    location: 'Accra', 
    image: '/upsa.png', 
    students: '11,500+',
    description: 'Specializing in accountancy, management, and other professional programs.'
  },
  { 
    id: 'uew', 
    name: 'University of Education', 
    location: 'Winneba', 
    image: '/uew.png', 
    students: '18,000+',
    description: "Ghana's leading institution for teacher education and educational research."
  }
];

interface UniversityDirectoryProps {
  limit?: number;
  showViewAll?: boolean;
}

const UniversityDirectory = ({ limit, showViewAll = true }: UniversityDirectoryProps) => {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAnimationComplete(false);
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [showAll]);

  const displayedUniversities = (limit && !showAll) ? universities.slice(0, limit) : universities;

  if (loading) {
    return <div className="py-8 text-center">Loading universities...</div>;
  }

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-between items-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Universities in Ghana</h2>
          {showViewAll && limit && universities.length > limit && !showAll && (
            <motion.button 
              onClick={() => setShowAll(true)}
              className="text-primary hover:text-secondary text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          )}
          {showAll && (
            <motion.button 
              onClick={() => setShowAll(false)}
              className="text-primary hover:text-secondary text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Show Less
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={showAll ? "expanded" : "collapsed"}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {displayedUniversities.map((university) => (
              <motion.div
                key={university.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex"
              >
                <Link 
                  to={`/universities/${university.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full w-full"
                >
                  <div className="h-20 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={university.image} 
                      alt={university.name} 
                      className="w-auto h-16 object-contain"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{university.name}</h3>
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <MapPin size={12} className="mr-1" />
                      <span>{university.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs mt-auto">
                      <Users size={12} className="mr-1" />
                      <span>{university.students} students</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {showViewAll && limit && universities.length > limit && !showAll && (
          <motion.div 
            className="text-center mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button 
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Universities
            </motion.button>
          </motion.div>
        )}
        
        {showAll && animationComplete && (
          <motion.div 
            className="text-center mt-6 sm:mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button 
              onClick={() => setShowAll(false)}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Less
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UniversityDirectory;
