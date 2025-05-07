import { MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/apiUtils';

// Define the university type
interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  students: string;
  description?: string;
}

// Fallback data in case API fails
const fallbackUniversities: University[] = [
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
    image: '/kwame-nkrumah-university-of-scie.png', 
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
    image: '/central.jpeg', 
    students: '8,000+',
    description: 'A private Christian university offering diverse programs with a focus on ethical leadership and character development.'
  },
  { 
    id: 'gimpa', 
    name: 'Ghana Institute of Management', 
    location: 'Accra', 
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/GIMPA_logo.png/220px-GIMPA_logo.png', 
    students: '15,000+',
    description: 'A leading institution for management and public administration education in Ghana.'
  }
];

interface UniversityDirectoryProps {
  limit?: number;
  showViewAll?: boolean;
}

const UniversityDirectory = ({ limit, showViewAll = true }: UniversityDirectoryProps) => {
  const [universities, setUniversities] = useState<University[]>(fallbackUniversities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get('/v1/universities');
        if (response.data && Array.isArray(response.data.data)) {
          // Map API response to our University interface
          const mappedUniversities = response.data.data.map((uni: any) => ({
            id: uni.id || uni._id,
            name: uni.name,
            location: uni.location || 'Ghana',
            image: uni.logo || `/universityofghana.png`, // Fallback to default image
            students: uni.studentCount ? `${uni.studentCount}+` : 'Many',
            description: uni.description || 'A leading university in Ghana'
          }));
          setUniversities(mappedUniversities.length > 0 ? mappedUniversities : fallbackUniversities);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
        // Use fallback data if API fails
        setUniversities(fallbackUniversities);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  // If limit is provided, only show that many universities
  const displayedUniversities = limit ? universities.slice(0, limit) : universities;

  if (loading) {
    return <div className="py-8 text-center">Loading universities...</div>;
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Universities in Ghana</h2>
          {showViewAll && (
            <Link to="/universities" className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
              View All
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedUniversities.map((university) => (
            <Link 
              key={university.id} 
              to={`/universities/${university.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={university.image} 
                  alt={university.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{university.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users size={14} className="mr-1" />
                  <span>{university.students} students</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showViewAll && limit && universities.length > limit && (
          <div className="text-center mt-6 sm:mt-8 md:mt-10">
            <Link 
              to="/universities" 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors text-sm sm:text-base"
            >
              View All Universities
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDirectory;
