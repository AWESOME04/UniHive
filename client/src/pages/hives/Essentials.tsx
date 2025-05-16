import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Package } from 'lucide-react';

const Essentials: React.FC = () => {
  return (
    <HiveList 
      title="Essentials"
      type="essentials"
      icon={<Package className="w-6 h-6" />}
      color="bg-blue-500"
      detailPageRoute="/dashboard/hives/essentials"
    />
  );
};

export default Essentials;
