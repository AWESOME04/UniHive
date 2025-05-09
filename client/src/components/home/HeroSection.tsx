import { Link } from "react-router-dom";
import {
  Sparkles,
  Users,
  ArrowRight,
  Laptop,
  CirclePlus,
  Trophy,
  Briefcase,
  Lightbulb,
  Clock,
} from "lucide-react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {

  return (
    <section className="relative pt-8 sm:pt-16 md:pt-20 pb-10 sm:pb-16 md:pb-24 px-3 sm:px-4 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-background via-white to-light-orange/20">
      {/* Static decorative elements instead of animated ones */}
      <div className="absolute top-20 left-1/4 w-12 h-12 bg-light-orange rounded-lg hidden lg:block" />
      <div className="absolute bottom-40 right-1/4 w-8 h-8 bg-secondary opacity-50 rounded-full hidden lg:block" />
      <div className="absolute top-1/2 left-10 w-6 h-6 bg-accent-purple opacity-40 rounded-md hidden lg:block" />

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
                  <div>
                    <Link
                      to="/dashboard"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <Laptop size={18} className="mr-2" />
                      <span>Go to Dashboard</span>
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/dashboard/add-hive"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <CirclePlus size={18} className="mr-2" />
                      <span>Post a Hive</span>
                    </Link>
                  </div>
                </>
              ) : (
                // Show these buttons for non-authenticated users
                <>
                  <div>
                    <Link
                      to="/register"
                      className="btn-primary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <Users size={18} className="mr-2" />
                      <span>Join UniHive</span>
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/login"
                      className="btn-secondary flex items-center justify-center py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-xl text-sm sm:text-base w-full"
                    >
                      <ArrowRight size={18} className="mr-2" />
                      <span>Login</span>
                    </Link>
                  </div>
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
                <span>5,000+ Hives</span>
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

          <div className="flex-1 max-w-xl w-full mt-8 lg:mt-0">
            <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-br from-secondary to-accent-purple">
              <div className="absolute inset-0 bg-white rounded-xl opacity-90"></div>
              <div className="relative bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
                  Explore Top Hives
                </h2>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  {[{
                    name: "Essentials",
                    icon: "🛒",
                    count: 125,
                    desc: "Used items like rice cookers, electric stoves, etc.",
                  },
                  {
                    name: "Academia",
                    icon: "📚",
                    count: 105,
                    desc: "Tutoring, mentoring, peer teaching, group studies",
                  },
                  {
                    name: "Logistics",
                    icon: "🚚",
                    count: 86,
                    desc: "Delivery requests, pick-ups, laundry runs, etc.",
                  },
                  {
                    name: "SideHustle",
                    icon: "💼",
                    count: 112,
                    desc: "Side gigs, freelance tasks, part-time work",
                  },
                  ].map((category) => (
                    <div key={category.name} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-light-orange/20 transition-all duration-300 cursor-pointer">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light-orange flex items-center justify-center text-xl">
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
                          {category.desc}
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
                      <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                        <img
                          src="/universityofghana.png"
                          alt="University of Ghana"
                          className="h-6 w-6 object-contain mr-2"
                        />
                        <span className="text-xs font-medium">
                          University of Ghana
                        </span>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                        <img
                          src="/kwame-nkrumah-university-of-scie.png"
                          alt="KNUST"
                          className="h-6 w-6 object-contain mr-2"
                        />
                        <span className="text-xs font-medium">KNUST</span>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                        <img
                          src="/ucc.png"
                          alt="UCC"
                          className="h-6 w-6 object-contain mr-2"
                        />
                        <span className="text-xs font-medium">UCC</span>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
                        <img
                          src="/central.png"
                          alt="Central University"
                          className="h-6 w-6 object-contain mr-2"
                        />
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
  );
};

export default HeroSection;
