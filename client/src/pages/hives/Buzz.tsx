import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Calendar } from 'lucide-react';

const Buzz: React.FC = () => {
  return (
    <HiveList 
      title="Buzz"
      type="buzz"
      icon={<Calendar className="w-6 h-6" />}
      color="bg-yellow-500"
    />
  );
};

export default Buzz;
