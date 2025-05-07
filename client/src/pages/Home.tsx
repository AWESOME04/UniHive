import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { throttle as lodashThrottle } from "lodash";
import {
  Briefcase,
  CirclePlus,
  GraduationCap,
  Users,
  Star,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Clock,
  Laptop,
  Trophy,
  Zap,
  ShoppingBag,
  Truck,
  Radio,
  Archive,
} from "lucide-react";
import UniversityDirectory from "../components/universities/UniversityDirectory";
import GhanaJobCategories from "../components/jobs/GhanaJobCategories";
import GhanaPaymentMethods from "../components/payment/GhanaPaymentMethods";
import { useAppSelector } from "../store";
import TaskCard from "../components/tasks/TaskCard";
import { RootState } from "../store";

function Home() {
  const auth = useAppSelector((state: RootState) => state.auth);
  const { tasks = [] } = useAppSelector((state: RootState) => state.tasks) || {
    tasks: [],
  };
  const isAuthenticated = auth?.isAuthenticated || false;

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      // Removed unused greeting state
    } else if (hours < 18) {
      // Removed unused greeting state
    } else {
      // Removed unused greeting state
    }
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Use CSS variables for cursor position to avoid inline style re-renders
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--cursor-x",
      `${cursorPosition.x}px`
    );
    document.documentElement.style.setProperty(
      "--cursor-y",
      `${cursorPosition.y}px`
    );
  }, [cursorPosition]);

  // Optimize mouse move handler with useCallback and throttling
  const handleMouseMove = useCallback(
    lodashThrottle((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 50), // Throttle to 50ms (20 updates per second)
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Categories renamed to Hives with the requested categories
  const hiveCategories = useMemo(
    () => [
      {
        name: "All",
        icon: <Star size={20} className="text-secondary" />,
        count: Array.isArray(tasks) ? tasks.length : 0,
        description: "View all Hives",
      },
      {
        name: "Essentials",
        icon: <ShoppingBag size={20} className="text-secondary" />,
        count: 125,
        description:
          "Used items like rice cookers, electric stoves, shoes, books, etc.",
      },
      {
        name: "Academia",
        icon: <GraduationCap size={20} className="text-secondary" />,
        count: 105,
        description: "Tutoring, mentoring, peer teaching, group studies",
      },
      {
        name: "Logistics",
        icon: <Truck size={20} className="text-secondary" />,
        count: 86,
        description: "Delivery requests, pick-ups, laundry runs, etc.",
      },
      {
        name: "Buzz",
        icon: <Radio size={20} className="text-secondary" />,
        count: 94,
        description: "Student businesses, event listings, club activities",
      },
      {
        name: "Archive",
        icon: <Archive size={20} className="text-secondary" />,
        count: 78,
        description: "Lecture notes, past questions, resources, templates",
      },
      {
        name: "SideHustle",
        icon: <Briefcase size={20} className="text-secondary" />,
        count: 112,
        description: "Side gigs, freelance tasks, part-time work",
      },
    ],
    [tasks]
  );

  // Featured tasks with more details
  const featuredTasks = useMemo(
    () => [
      {
        title: "Photography",
        description: "Wedding photographer needed",
        price: "₵250",
        icon: "📸",
        hive: "SideHustle",
      },
      {
        title: "Design",
        description: "Create a high converting landing page",
        price: "₵100",
        icon: "🎨",
        hive: "SideHustle",
      },
      {
        title: "Rice Cooker",
        description: "Slightly used rice cooker in good condition",
        price: "₵40",
        icon: "🍚",
        hive: "Essentials",
      },
      {
        title: "Web Development",
        description: "Build a responsive website",
        price: "₵500",
        icon: "🖥️",
        hive: "SideHustle",
      },
      {
        title: "Calculus Tutor",
        description: "Need help with Calculus II assignments",
        price: "₵80",
        icon: "📊",
        hive: "Academia",
      },
      {
        title: "Lecture Notes",
        description: "Complete Engineering Physics notes available",
        price: "₵30",
        icon: "📝",
        hive: "Archive",
      },
    ],
    []
  );

  // Universities with locations
  const universities = useMemo(
    () => [
      {
        name: "University of Ghana",
        shortName: "University of Ghana",
        location: "Accra, Ghana",
      },
      {
        name: "Kwame Nkrumah University of Science and Technology",
        shortName: "KNUST",
        location: "Kumasi, Ghana",
      },
      {
        name: "University of Cape Coast",
        shortName: "UCC",
        location: "Cape Coast, Ghana",
      },
      {
        name: "Ghana Institute of Management and Public Administration",
        shortName: "GIMPA",
        location: "Accra, Ghana",
      },
      {
        name: "Ashesi University",
        shortName: "Ashesi",
        location: "Berekuso, Ghana",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section with Gradient Background */}
      <section className="relative pt-8 sm:pt-16 md:pt-20 pb-10 sm:pb-16 md:pb-24 px-3 sm:px-4 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-background via-white to-light-orange/20">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-secondary opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-0 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-accent-purple opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-dark-orange opacity-5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-1/4 w-12 h-12 bg-light-orange rounded-lg rotate-12 animate-float hidden lg:block"></div>
        <div className="absolute bottom-40 right-1/4 w-8 h-8 bg-secondary opacity-50 rounded-full animate-float animation-delay-1000 hidden lg:block"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-accent-purple opacity-40 rounded-md animate-float animation-delay-2000 hidden lg:block"></div>

        <div className="container mx-auto relative z-10 px-0">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-between">
            <div className="flex-1 max-w-full sm:max-w-xl lg:max-w-2xl w-full">
              <div className="inline-flex items-center mb-3 sm:mb-6 px-3 py-1.5 sm:py-2 bg-light-orange/20 rounded-full text-xs sm:text-sm">
                <Sparkles size={16} className="text-secondary mr-2" />
                <span className="font-medium">
                  Find the best student gigs in Ghana
                </span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-tight tracking-tight">
                Connect, Collaborate &amp;{" "}
                <span className="text-secondary">Earn</span> as a University
                Student
              </h1>

              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-8 leading-relaxed">
                UniHive connects Ghanaian university students with side hustles,
                internships, and freelance opportunities tailored to your skills
                and academic schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
                {isAuthenticated ? (
                  // Show these buttons for authenticated users
                  <>
                    <Link
                      to="/dashboard"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base"
                    >
                      <Laptop size={18} className="mr-2" />
                      <span>Go to Dashboard</span>
                    </Link>

                    <Link
                      to="/dashboard/add-job"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base"
                    >
                      <CirclePlus size={18} className="mr-2" />
                      <span>Post a Job</span>
                    </Link>
                  </>
                ) : (
                  // Show these buttons for non-authenticated users
                  <>
                    <Link
                      to="/register"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base"
                    >
                      <Users size={18} className="mr-2" />
                      <span>Join UniHive</span>
                    </Link>

                    <Link
                      to="/login"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base"
                    >
                      <ArrowRight size={18} className="mr-2" />
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                  <Trophy size={14} className="text-secondary mr-1" />
                  <span>20,000+ Students</span>
                </div>
                <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                  <Briefcase size={14} className="text-secondary mr-1" />
                  <span>5,000+ Jobs</span>
                </div>
                <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                  <Lightbulb size={14} className="text-secondary mr-1" />
                  <span>500+ Employers</span>
                </div>
                <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                  <Clock size={14} className="text-secondary mr-1" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full mt-6 lg:mt-0">
              <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-br from-secondary to-accent-purple">
                <div className="absolute inset-0 bg-white rounded-xl opacity-90"></div>
                <div className="relative bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
                    Explore Top Hives
                  </h2>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    {hiveCategories.slice(1, 5).map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-light-orange/20 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light-orange flex items-center justify-center">
                          {category.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {category.count}+ tasks
                          </p>
                          <p className="text-xs text-gray-500 hidden sm:block">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                    <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                      Popular Universities
                    </h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <img src="/universityofghana.png" alt="University of Ghana" className="h-6 w-6 object-contain mr-2" />
                          <span className="text-xs font-medium">University of Ghana</span>
                        </div>
                        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <img src="/kwame-nkrumah-university-of-scie.png" alt="KNUST" className="h-6 w-6 object-contain mr-2" />
                          <span className="text-xs font-medium">KNUST</span>
                        </div>
                        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <img src="/ucc.png" alt="UCC" className="h-6 w-6 object-contain mr-2" />
                          <span className="text-xs font-medium">UCC</span>
                        </div>
                        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                          <img src="/central.jpeg" alt="Central University" className="h-6 w-6 object-contain mr-2" />
                          <span className="text-xs font-medium">Central</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tasks Section with subtle scroll-based animation */}
      <section
        className={`py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white ${
          isScrolled ? "translate-y-0 opacity-100" : "translate-y-4 opacity-95"
        }`}
      >
        <div className="container mx-auto px-0">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center mb-2 sm:mb-4 px-2 sm:px-3 py-1 bg-secondary/10 rounded-full text-xs sm:text-sm">
              <Zap size={14} className="text-secondary mr-1 sm:mr-2" />
              <span className="font-medium">Popular right now</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              Featured Tasks
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-1">
              Discover the most popular tasks from our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredTasks.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-secondary/20 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-5">
                  <div className="text-2xl sm:text-3xl">{task.icon}</div>
                  <div className="bg-light-orange text-secondary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    {task.price}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    {task.title}
                  </h3>
                  <span className="bg-secondary/10 text-secondary text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {task.hive}
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
                  {task.description}
                </p>

                {isAuthenticated ? (
                  <Link
                    to="/dashboard/search"
                    className="text-secondary flex items-center text-xs sm:text-sm hover:underline"
                  >
                    View details <ChevronRight size={12} className="ml-1" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-secondary flex items-center text-xs sm:text-sm hover:underline"
                  >
                    Login to apply <ChevronRight size={12} className="ml-1" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Hive */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10">
        <div className="container mx-auto px-0">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              Browse by Hive
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-1">
              Explore opportunities across various Hives tailored to university
              students' needs
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
            {/* Tabs for categories */}
            <div className="flex overflow-x-auto scrollbar-hide mb-4 sm:mb-8 pb-2">
              {hiveCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center whitespace-nowrap min-w-max px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg mr-2 sm:mr-3 transition-colors ${
                    activeCategory === category.name
                      ? "bg-secondary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="flex items-center justify-center mr-1.5 sm:mr-2">
                    {typeof category.icon === "object" ? (
                      category.icon
                    ) : (
                      <span className="text-secondary">{category.icon}</span>
                    )}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Description for selected category */}
            {activeCategory !== "All" && (
              <div className="mb-4 sm:mb-8 p-3 sm:p-4 bg-light-orange/10 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                  {activeCategory} Hive
                </h3>
                <p className="text-xs text-gray-500">
                  {
                    hiveCategories.find((cat) => cat.name === activeCategory)
                      ?.description
                  }
                </p>
              </div>
            )}

            {/* Tasks grid with responsive design */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {featuredTasks
                .filter(
                  (task) =>
                    activeCategory === "All" || task.hive === activeCategory
                )
                .map((task, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-secondary/20"
                  >
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="text-xl sm:text-2xl">{task.icon}</div>
                      <div className="bg-light-orange/80 text-secondary px-2 py-0.5 rounded-full text-xs font-medium">
                        {task.price}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold mb-1">
                      {task.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="bg-secondary/10 text-secondary text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                        {task.hive}
                      </span>

                      <Link
                        to={isAuthenticated ? "/dashboard/search" : "/login"}
                        className="text-secondary flex items-center text-xs hover:underline"
                      >
                        {isAuthenticated ? "View details" : "Login to view"}
                        <ChevronRight size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-gradient-to-br from-secondary to-accent-orange">
        <div className="container mx-auto text-center px-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-6">
            Ready to join the Hive?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-5 sm:mb-8 max-w-2xl mx-auto">
            Connect with other students, find opportunities, and make the most
            of your university experience on UniHive.
          </p>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-secondary rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/register"
                className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-secondary rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
              >
                Join UniHive
              </Link>
              <Link
                to="/login"
                className="inline-block px-4 sm:px-8 py-2.5 sm:py-4 bg-white/20 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/30 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white">
        <div className="container mx-auto px-0">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              What Students Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Hear from university students who have found opportunities and
              connections through UniHive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md relative">
              <div className="text-secondary text-sm sm:text-lg mb-2 sm:mb-3">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-700">
                "Through UniHive, I found a graphic design gig that pays for my
                weekend expenses. The platform is so easy to use and has
                connected me with long-term clients."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 mr-2 sm:mr-3"></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">
                    Kofi Mensah
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    University of Ghana, 3rd Year
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md relative">
              <div className="text-secondary text-sm sm:text-lg mb-2 sm:mb-3">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-700">
                "I sold my old textbooks and calculator on UniHive and made
                enough to buy new ones for this semester. It's great to have a
                marketplace just for students!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 mr-2 sm:mr-3"></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">
                    Ama Boateng
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    KNUST, 2nd Year
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md relative">
              <div className="text-secondary text-sm sm:text-lg mb-2 sm:mb-3">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-700">
                "As an international student, UniHive helped me find tutoring
                opportunities and connect with local students. I now earn while
                helping others with their studies."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 mr-2 sm:mr-3"></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">
                    David Osei
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Central University, 4th Year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10">
        <div className="container mx-auto text-center px-0">
          <UniversityDirectory limit={4} showViewAll={true} />
        </div>
      </section>

      {/* Ghana Job Categories */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-white">
        <div className="container mx-auto text-center px-0">
          <GhanaJobCategories limit={8} showViewAll={true} />
        </div>
      </section>

      {/* Ghana Payment Methods */}
      <section className="py-8 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8 lg:px-12 bg-light-orange/10">
        <div className="container mx-auto text-center px-0">
          <GhanaPaymentMethods showExample={true} />
        </div>
      </section>

      {/* Add custom CSS styles for animations and scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .animate-blob {
          animation: blob-animation 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes blob-animation {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Hexagonal Honeycomb Pattern */
        .hexagon-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23F6A93B' fill-opacity='0.05' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Background Hexagon Pattern - Honeycomb */}
      <div className="fixed inset-0 hexagon-pattern pointer-events-none opacity-40 z-0"></div>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(Home);
