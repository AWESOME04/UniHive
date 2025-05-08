import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Bookmark } from 'lucide-react';

const Essentials: React.FC = () => {
  return (
    <HiveList 
      title="Essentials"
      type="essentials"
      icon={<Bookmark className="w-6 h-6" />}
      color="bg-red-500"
    />
  );
};

export default Essentials;
