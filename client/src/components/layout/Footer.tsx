import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pt-10 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">UniHive</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect, collaborate, and earn as a university student. The
              platform for students to find opportunities within their
              university community.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/unihive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-secondary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com/unihive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-secondary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/unihive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-secondary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://github.com/unihive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-secondary transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/search"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Browse Hives
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-hive"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Post a Task
                </Link>
              </li>
              <li>
                <Link
                  to="/universities"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Universities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-secondary mt-0.5 mr-2 flex-shrink-0"
                />
                <span className="text-gray-600 text-sm">
                  University of Ghana, Legon, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-secondary mr-2 flex-shrink-0" />
                <a
                  href="mailto:hello@unihive.com"
                  className="text-gray-600 hover:text-secondary text-sm transition-colors"
                >
                  hello@unihive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-3 sm:mb-0">
            &copy; {year} UniHive. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/terms"
              className="text-gray-600 hover:text-secondary text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-secondary text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="text-gray-600 hover:text-secondary text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
