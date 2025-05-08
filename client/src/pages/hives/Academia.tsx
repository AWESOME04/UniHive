import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { BookOpen } from 'lucide-react';

const Academia: React.FC = () => {
  return (
    <HiveList 
      title="Academia"
      type="academia"
      icon={<BookOpen className="w-6 h-6" />}
      color="bg-blue-500"
    />
  );
};

export default Academia;
