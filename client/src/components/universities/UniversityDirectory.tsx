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
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Ghana_seal.svg/1200px-University_of_Ghana_seal.svg.png', 
    students: '38,000+',
    description: 'The oldest and largest university in Ghana, offering a wide range of programs across various disciplines.'
  },
  { 
    id: 'knust', 
    name: 'Kwame Nkrumah University', 
    location: 'Kumasi', 
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/KNUST_logo.jpg/220px-KNUST_logo.jpg', 
    students: '42,000+',
    description: 'Known for its strong focus on science and technology education, research and entrepreneurship.'
  },
  { 
    id: 'ucc', 
    name: 'University of Cape Coast', 
    location: 'Cape Coast', 
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/University_of_Cape_Coast_logo.svg/1200px-University_of_Cape_Coast_logo.svg.png', 
    students: '21,000+',
    description: 'Renowned for its education programs and beautiful coastal campus setting.'
  },
  { 
    id: 'gimpa', 
    name: 'Ghana Institute of Management', 
    location: 'Accra', 
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/GIMPA_logo.png/220px-GIMPA_logo.png', 
    students: '15,000+',
    description: 'A leading institution for management and public administration education in Ghana.'
  },
  { 
    id: 'central', 
    name: 'Central University', 
    location: 'Accra', 
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Central_University_Ghana_logo.png', 
    students: '8,000+',
    description: 'A private Christian university offering diverse programs with a focus on ethical leadership and character development.'
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
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Top Universities in Ghana</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join students from Ghana's leading universities who are already using UniHive to find opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedUniversities.map((university) => (
            <div key={university.id} className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src={university.image} alt={university.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-center text-primary mb-2">{university.name}</h3>
                <div className="flex items-center justify-center text-gray-500 mb-3">
                  <MapPin size={16} className="mr-1 text-secondary" />
                  <span className="text-sm">{university.location}</span>
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  <Users size={16} className="mr-1 text-secondary" />
                  <span className="text-sm">{university.students} Students</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAll && limit && ghanaUniversities.length > limit && (
          <div className="text-center mt-10">
            <Link 
              to="/universities" 
              className="inline-flex items-center px-6 py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors"
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
