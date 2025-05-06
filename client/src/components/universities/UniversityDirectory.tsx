import { MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the university type
interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  students: string;
  description?: string;
}

// Sample data for Ghanaian universities
const ghanaUniversities: University[] = [
  { 
    id: 'uog', 
    name: 'University of Ghana', 
    location: 'Legon, Accra', 
    image: 'https://seeklogo.com/images/U/university-of-ghana-logo-9C322A1398-seeklogo.com.png', 
    students: '38,000+',
    description: 'The oldest and largest university in Ghana, offering a wide range of programs across various disciplines.'
  },
  { 
    id: 'knust', 
    name: 'Kwame Nkrumah University', 
    location: 'Kumasi', 
    image: 'https://seeklogo.com/images/K/knust-logo-5287B0F4B6-seeklogo.com.png', 
    students: '42,000+',
    description: 'Known for its strong focus on science and technology education, research and entrepreneurship.'
  },
  { 
    id: 'ucc', 
    name: 'University of Cape Coast', 
    location: 'Cape Coast', 
    image: 'https://brandfetch.com/_next/image?url=https%3A%2F%2Fasset.brandfetch.io%2FidFdo8_l4R%2FidtZYC20Rb.jpeg&w=1920&q=75', 
    students: '21,000+',
    description: 'Renowned for its education programs and beautiful coastal campus setting.'
  },
  { 
    id: 'central', 
    name: 'Central University', 
    location: 'Accra', 
    image: 'https://central.edu.gh/wp-content/uploads/2022/04/CU-Logo-1.png', 
    students: '15,000+',
    description: 'A private Christian university offering diverse programs with a focus on ethical leadership and character development.'
  },
  { 
    id: 'ashesi', 
    name: 'Ashesi University', 
    location: 'Berekuso', 
    image: 'https://brandfetch.com/_next/image?url=https%3A%2F%2Fasset.brandfetch.io%2FidZlmZsj3U%2Fid_fU20mQN.png&w=1920&q=75', 
    students: '8,000+',
    description: 'A private university focused on cultivating ethical entrepreneurial leaders in Africa through innovative teaching methods.'
  }
];

interface UniversityDirectoryProps {
  limit?: number;
  showViewAll?: boolean;
}

const UniversityDirectory = ({ limit, showViewAll = true }: UniversityDirectoryProps) => {
  // If limit is provided, only show that many universities
  const displayedUniversities = limit ? ghanaUniversities.slice(0, limit) : ghanaUniversities;

  return (
    <div className="py-10 sm:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">Top Universities in Ghana</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Join students from Ghana's leading universities who are already using UniHive to find opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {displayedUniversities.map((university) => (
            <div 
              key={university.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 flex items-center justify-center bg-white rounded-full p-2 shadow-sm">
                  <img src={university.image} alt={university.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center text-primary mb-2 line-clamp-1">{university.name}</h3>
                <div className="flex items-center justify-center text-gray-500 mb-2 sm:mb-3">
                  <MapPin size={14} className="mr-1 text-secondary flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{university.location}</span>
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  <Users size={14} className="mr-1 text-secondary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{university.students} Students</span>
                </div>
                {university.description && (
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 text-center line-clamp-2">
                    {university.description}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <Link 
                    to={`/universities/${university.id}`} 
                    className="text-secondary text-xs sm:text-sm font-medium hover:underline inline-flex items-center"
                  >
                    View Programs <MapPin size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAll && limit && ghanaUniversities.length > limit && (
          <div className="text-center mt-8 sm:mt-10">
            <Link 
              to="/universities" 
              className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors text-sm sm:text-base"
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
