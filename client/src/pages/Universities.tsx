import React, { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

// Define the university type
interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  students: string;
  description?: string;
  established?: string;
  website?: string;
  programs?: number;
  faculties?: number;
}

// Sample data for Ghanaian universities
const ghanaUniversities: University[] = [
  {
    id: "uog",
    name: "University of Ghana",
    location: "Legon, Accra",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Ghana_seal.svg/1200px-University_of_Ghana_seal.svg.png",
    students: "38,000+",
    description:
      "The oldest and largest university in Ghana, offering a wide range of programs across various disciplines.",
    established: "1948",
    website: "https://www.ug.edu.gh",
    programs: 250,
    faculties: 12,
  },
  {
    id: "knust",
    name: "Kwame Nkrumah University of Science and Technology",
    location: "Kumasi",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/KNUST_logo.jpg/220px-KNUST_logo.jpg",
    students: "42,000+",
    description:
      "Known for its strong focus on science and technology education, research and entrepreneurship.",
    established: "1952",
    website: "https://www.knust.edu.gh",
    programs: 220,
    faculties: 10,
  },
  {
    id: "ucc",
    name: "University of Cape Coast",
    location: "Cape Coast",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/University_of_Cape_Coast_logo.svg/1200px-University_of_Cape_Coast_logo.svg.png",
    students: "21,000+",
    description:
      "Renowned for its education programs and beautiful coastal campus setting.",
    established: "1962",
    website: "https://www.ucc.edu.gh",
    programs: 180,
    faculties: 8,
  },
  {
    id: "gimpa",
    name: "Ghana Institute of Management and Public Administration",
    location: "Accra",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/GIMPA_logo.png/220px-GIMPA_logo.png",
    students: "15,000+",
    description:
      "A leading institution for management and public administration education in Ghana.",
    established: "1961",
    website: "https://www.gimpa.edu.gh",
    programs: 75,
    faculties: 5,
  },
  {
    id: "ashesi",
    name: "Ashesi University",
    location: "Berekuso",
    image: "https://www.ashesi.edu.gh/images/logo-mobile.png",
    students: "1,200+",
    description:
      "Known for its innovative approach to higher education with a focus on ethics and entrepreneurial leadership.",
    established: "2002",
    website: "https://www.ashesi.edu.gh",
    programs: 30,
    faculties: 4,
  },
  {
    id: "central",
    name: "Central University",
    location: "Accra",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/Central_University_Ghana_logo.png",
    students: "8,000+",
    description:
      "A private Christian university offering diverse programs with a focus on ethical leadership.",
    established: "1988",
    website: "https://www.central.edu.gh",
    programs: 60,
    faculties: 6,
  },
  {
    id: "uew",
    name: "University of Education, Winneba",
    location: "Winneba",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/UEW_logo.jpg/220px-UEW_logo.jpg",
    students: "18,000+",
    description:
      "Specializes in teacher education and educational leadership programs.",
    established: "1992",
    website: "https://www.uew.edu.gh",
    programs: 120,
    faculties: 7,
  },
  {
    id: "uds",
    name: "University for Development Studies",
    location: "Tamale",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/University_for_Development_Studies_logo.svg/1200px-University_for_Development_Studies_logo.svg.png",
    students: "20,000+",
    description:
      "Focuses on programs that promote sustainable development in northern Ghana.",
    established: "1992",
    website: "https://www.uds.edu.gh",
    programs: 140,
    faculties: 8,
  },
];

const Universities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // Filter universities based on search term and region
  const filteredUniversities = ghanaUniversities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter
      ? university.location.toLowerCase().includes(regionFilter.toLowerCase())
      : true;
    return matchesSearch && matchesRegion;
  });

  // Ghana regions for filtering
  const regions = [
    "Accra",
    "Kumasi",
    "Cape Coast",
    "Tamale",
    "Winneba",
    "Berekuso",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Universities in Ghana
            </h1>
            <p className="text-xl mb-8">
              Discover opportunities at Ghana's top universities and connect
              with students from across the country.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b py-4 px-4 md:px-8 lg:px-16 sticky top-16 z-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="font-medium text-gray-700">Filter by:</div>

            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 mr-4">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-gray-500">
                        <MapPin size={14} className="mr-1 text-secondary" />
                        <span className="text-sm">{university.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{university.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Users size={14} className="mr-1 text-secondary" />
                        <span className="text-xs">Students</span>
                      </div>
                      <div className="font-medium">{university.students}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <GraduationCap
                          size={14}
                          className="mr-1 text-secondary"
                        />
                        <span className="text-xs">Established</span>
                      </div>
                      <div className="font-medium">
                        {university.established}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Briefcase size={14} className="mr-1 text-secondary" />
                        <span className="text-xs">Programs</span>
                      </div>
                      <div className="font-medium">{university.programs}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <GraduationCap
                          size={14}
                          className="mr-1 text-secondary"
                        />
                        <span className="text-xs">Faculties</span>
                      </div>
                      <div className="font-medium">{university.faculties}</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-medium hover:underline"
                    >
                      Visit Website
                    </a>
                    <Link
                      to={`/universities/${university.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      View Hives
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                No universities found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Universities;
