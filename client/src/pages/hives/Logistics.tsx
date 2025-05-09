import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Package } from 'lucide-react';

const Logistics: React.FC = () => {
  return (
    <HiveList 
      title="Logistics"
      type="logistics"
      icon={<Package className="w-6 h-6" />}
      color="bg-green-500"
    />
  );
};

export default Logistics;
