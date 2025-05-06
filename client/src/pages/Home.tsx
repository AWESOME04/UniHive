import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { throttle as lodashThrottle } from 'lodash';
import { 
  Briefcase, CirclePlus, GraduationCap, Users, Star, 
  TrendingUp, BookOpen, ChevronRight, DollarSign, ArrowRight,
  Search, Code, PenTool, FileText, Database
} from 'lucide-react';
import UniversityDirectory from '../components/universities/UniversityDirectory';
import GhanaJobCategories from '../components/jobs/GhanaJobCategories';
import GhanaPaymentMethods from '../components/payment/GhanaPaymentMethods';
import { useAppSelector } from '../store';
import TaskCard from '../components/tasks/TaskCard';
import { RootState } from '../store';

// Memoized TaskCard component to prevent unnecessary re-renders
const MemoizedTaskCard = memo(TaskCard);

function Home() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [greeting, setGreeting] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  
  // Use CSS variables for cursor position to avoid inline style re-renders
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-x', `${cursorPosition.x}px`);
    document.documentElement.style.setProperty('--cursor-y', `${cursorPosition.y}px`);
  }, [cursorPosition]);

  // Optimize mouse move handler with useCallback and throttling
  const handleMouseMove = useCallback(
    lodashThrottle((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 50), // Throttle to 50ms (20 updates per second)
    []
  );
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Get 3 most recent tasks - memoized to prevent recalculation on every render
  const recentTasks = useMemo(() => 
    [...tasks].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3),
    [tasks]
  );
  
  // Categories for task grid - memoized to prevent recreation on every render
  const categories = useMemo(() => [
    { name: 'All', icon: <Star size={20} className="text-secondary" />, count: tasks.length },
    { name: 'Tutoring', icon: <GraduationCap size={20} className="text-secondary" />, count: 120 },
    { name: 'Event Planning', icon: <Users size={20} className="text-secondary" />, count: 85 },
    { name: 'Content Creation', icon: <TrendingUp size={20} className="text-secondary" />, count: 90 },
    { name: 'Research', icon: <BookOpen size={20} className="text-secondary" />, count: 75 },
    { name: 'Web Development', icon: <Briefcase size={20} className="text-secondary" />, count: 110 },
  ], [tasks.length]);

  // Featured tasks with more details
  const featuredTasks = useMemo(() => [
    { 
      title: 'Web Development',
      description: 'Build a responsive website for a local business',
      price: 'GH₵1,500',
      icon: <Code />
    },
    { 
      title: 'Graphic Design',
      description: 'Create a high converting landing page',
      price: 'GH₵600',
      icon: <PenTool />
    },
    { 
      title: 'Content Writing',
      description: 'Write 5 blog posts about student life',
      price: 'GH₵250',
      icon: <FileText />
    },
    { 
      title: 'Marketing',
      description: 'Run a social media campaign for a startup',
      price: 'GH₵3,000',
      icon: <TrendingUp />
    },
    { 
      title: 'Tutoring',
      description: 'Teach mathematics to high school students',
      price: 'GH₵500',
      icon: <BookOpen />
    },
    { 
      title: 'Data Entry',
      description: 'Input customer data into a CRM system',
      price: 'GH₵180',
      icon: <Database />
    },
  ], []);

  // Universities with locations
  const universities = useMemo(() => [
    { name: 'University of Ghana', shortName: 'University of Ghana', location: 'Accra, Ghana' },
    { name: 'Kwame Nkrumah University of Science and Technology', shortName: 'KNUST', location: 'Kumasi, Ghana' },
    { name: 'University of Cape Coast', shortName: 'UCC', location: 'Cape Coast, Ghana' },
    { name: 'Central University', shortName: 'Central', location: 'Accra, Ghana' },
    { name: 'Ashesi University', shortName: 'Ashesi', location: 'Berekuso, Ghana' },
  ], []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-white to-light-orange/10">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/5 rounded-full -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-center">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-primary">
                {greeting}, <span className="text-secondary">{user?.username || 'Student'}</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-gray-700 max-w-xl leading-relaxed">
                Find the best side hustles across all universities in Ghana
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
                <Link to="/search" className="btn-primary flex items-center justify-center group py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all">
                  <Search size={18} className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Find Side Hustles</span>
                </Link>
                
                <Link to="/add-job" className="btn-secondary flex items-center justify-center group py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all">
                  <CirclePlus size={18} className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Post a Job</span>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-0">
                <p className="w-full text-sm text-gray-600 mb-2">Popular Universities:</p>
                {universities.map((uni) => (
                  <div 
                    key={uni.name} 
                    className="bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-sm hover:shadow-md transition-default text-xs sm:text-sm hover:bg-light-orange/20 cursor-pointer"
                  >
                    {uni.shortName}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-secondary opacity-5 rounded-full"></div>
                <div className="absolute -z-10 bottom-10 left-10 w-60 h-60 bg-accent-purple opacity-5 rounded-full"></div>
                
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl-soft">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {categories.slice(0, 4).map((category) => (
                      <div 
                        key={category.name}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-light-orange/20 transition-default cursor-pointer border border-gray-100"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light-orange/30 flex items-center justify-center flex-shrink-0">
                          {category.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">{category.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{category.count}+ tasks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          alt="Student" 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium text-sm">Akosua Mensah</p>
                          <p className="text-xs text-gray-500">University of Ghana</p>
                        </div>
                      </div>
                      <div className="bg-light-orange/20 text-secondary px-2 py-1 rounded-full text-xs">
                        GH₵1,500 earned
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 italic">
                      "UniHive helped me find flexible work while studying. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tasks Section */}
      <section className="py-10 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Tasks</h2>
            <Link to="/tasks" className="text-secondary flex items-center hover:underline text-sm sm:text-base">
              View all tasks <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredTasks.map((task, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-default border border-gray-100">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl">{task.icon}</div>
                  <div className="bg-light-orange text-secondary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {task.price}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{task.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{task.description}</p>
                <Link to="/tasks" className="text-secondary flex items-center text-xs sm:text-sm hover:underline">
                  View details <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 sm:py-16 px-4 md:px-8 lg:px-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">How UniHive Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-light-orange rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search size={20} className="text-secondary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Find Tasks</h3>
              <p className="text-sm sm:text-base text-gray-600">Browse through hundreds of tasks posted by students and businesses.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-light-orange rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Briefcase size={20} className="text-secondary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Apply & Complete</h3>
              <p className="text-sm sm:text-base text-gray-600">Apply for tasks that match your skills and complete them on time.</p>
            </div>
            
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-light-orange rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <DollarSign size={20} className="text-secondary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Get Paid</h3>
              <p className="text-sm sm:text-base text-gray-600">Receive payment directly after your work is approved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse By Category Section */}
      <section className="py-10 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">Browse By Category</h2>
          
          <div className="flex overflow-x-auto pb-3 sm:pb-4 gap-2 sm:gap-4 mb-6 sm:mb-8 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full whitespace-nowrap text-sm sm:text-base ${
                  activeCategory === category.name 
                    ? 'bg-secondary text-white' 
                    : 'bg-light-orange/50 text-gray-700 hover:bg-light-orange'
                } transition-default`}
                onClick={() => setActiveCategory(category.name)}
              >
                <span className="flex-shrink-0">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs opacity-80">({category.count})</span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentTasks.map((task) => (
              <MemoizedTaskCard key={task.id} task={task} />
            ))}
            
            {recentTasks.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No tasks available in this category yet.</p>
                <Link to="/add-job" className="btn-primary inline-flex items-center mt-3 sm:mt-4 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
                  <CirclePlus size={18} className="mr-2" />
                  Post the first task
                </Link>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6 sm:mt-10">
            <Link 
              to="/tasks" 
              className="btn-secondary inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base"
            >
              View All Tasks
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Side Hustles */}
      <section className="py-10 sm:py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">Recent Side Hustles</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">Find your next opportunity from our latest listings</p>
            </div>
            <Link to="/search" className="mt-3 md:mt-0 inline-flex items-center text-secondary font-medium text-sm sm:text-base">
              View all opportunities
              <svg className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {recentTasks.map((recentTask, index) => (
              <TaskCard key={index} task={recentTask} />
            ))}
          </div>
        </div>
      </section>

      {/* Ghana Universities Section */}
      <UniversityDirectory limit={4} showViewAll={true} />

      {/* Ghana Job Categories */}
      <GhanaJobCategories limit={8} showViewAll={true} />

      {/* Ghana Payment Methods */}
      <GhanaPaymentMethods showExample={true} />

      {/* CTA Section */}
      <section className="py-10 sm:py-16 px-4 md:px-8 lg:px-16 bg-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Ready to start earning?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">Join thousands of students who are already using UniHive to find side hustles and earn while they study.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/register" className="bg-white text-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-medium hover:bg-light-orange transition-default text-sm sm:text-base">
              Sign Up Now
            </Link>
            <Link to="/search" className="border border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-medium hover:bg-white/10 transition-default text-sm sm:text-base">
              Browse Side Hustles
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael K.",
                university: "University of Ghana",
                quote: "UniHive helped me find flexible work that fits around my studies. I've been able to earn extra income while gaining valuable experience.",
                avatar: "M"
              },
              {
                name: "Rebecca A.",
                university: "KNUST",
                quote: "The platform is so easy to use! I've completed several design tasks and built up my portfolio while making money.",
                avatar: "R"
              },
              {
                name: "David O.",
                university: "Ashesi University",
                quote: "As a computer science student, I found web development projects that helped me apply what I'm learning in real-world scenarios.",
                avatar: "D"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-secondary fill-secondary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS for hiding scrollbar but allowing scroll */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Home);
