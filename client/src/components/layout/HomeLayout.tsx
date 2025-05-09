import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import { useAuth } from '../../context/AuthContext';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { user } = useAuth();

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full overflow-x-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar user={user} />
      <main className="flex-grow pt-16 w-full overflow-x-hidden"> {/* pt-16 to account for fixed navbar */}
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  );
};

export default HomeLayout;
