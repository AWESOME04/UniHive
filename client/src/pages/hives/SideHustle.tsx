import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Briefcase } from 'lucide-react';

const SideHustle: React.FC = () => {
  return (
    <HiveList 
      title="Side Hustle"
      type="sidehustle"
      icon={<Briefcase className="w-6 h-6" />}
      color="bg-indigo-500"
    />
  );
};

export default SideHustle;
